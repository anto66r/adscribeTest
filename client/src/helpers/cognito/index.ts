// @ts-ignore
import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { config as AWSConfig } from 'aws-sdk';
import Amplify, { Auth } from 'aws-amplify';

import { setCookie, getCookie, deleteCookie } from '../cookies';
import awsConfig from '../../awsconfig';

Amplify.configure(awsConfig);

type CognitoSessionModel = {
  accessToken: {
    jwtToken: string;
  };
  idToken: {
    jwtToken: string;
    payload: {
      email: string;
      'cognito:username': string;
    };
  };
  refreshToken: {
    token: string;
  };
}

AWSConfig.region = process.env.REACT_APP_COGNITO_REGION;

const tokenScopes = [
  'openid',
  'email',
  'profile',
  'http://localhost:5000/api',
  'transactions/api',
  'transactions/post',
  'transactions/get',
  'api',
  'post',
  'get',
];

const {
  REACT_APP_USER_POOL_BASE_URL: userPoolBaseUrl = '',
  REACT_APP_COGNITO_CALLBACK_URL: callbackUrl = '',
  REACT_APP_COGNITO_USER_POOL: userPool = '',
  REACT_APP_COGNITO_CLIENT_ID: clientId = '',
  REACT_APP_COGNITO_SIGNOUT_URL: signoutUri = '',
} = process.env;


// Creates a CognitoAuth instance
const createCognitoAuth = () => {
  const appWebDomain = userPoolBaseUrl.replace('https://', '').replace('http://', '');
  const auth = new CognitoAuth({
    UserPoolId: userPool,
    ClientId: clientId,
    AppWebDomain: appWebDomain,
    TokenScopesArray: tokenScopes,
    RedirectUriSignIn: callbackUrl,
    RedirectUriSignOut: signoutUri,
  });
  return auth;
};

// Creates a CognitoUserPool instance
const createCognitoUserPool = () => new CognitoUserPool({
  UserPoolId: userPool,
  ClientId: clientId,
});

// Creates a CognitoUser instance
const createCognitoUser = () => {
  const pool = createCognitoUserPool();
  return pool.getCurrentUser();
};

// Get the URI of the hosted sign in screen
const getCognitoSignInUri = () => `${userPoolBaseUrl}/login?response_type=code&client_id=${clientId}&redirect_uri=${callbackUrl}`;

// Parse the response from a Cognito callback URI
// (assumed a token or code is in the supplied href). Returns a promise.
const parseCognitoWebResponse = (href: string) => new Promise((resolve, reject) => {
  const auth = createCognitoAuth();

  // userHandler will trigger the promise
  auth.userhandler = {
    onSuccess(result: Record<string, any>) {
      resolve(result);
    },
    onFailure(err: string) {
      reject(new Error(`Failure parsing Cognito web response: ${err}`));
    },
  };
  auth.parseCognitoWebResponse(href);
});

// Gets a new Cognito session. Returns a promise.
const getCognitoSession = () => new Promise((resolve, reject) => {
  const cognitoUser = createCognitoUser();
  if (cognitoUser === null) {
    reject();
    return;
  }
  cognitoUser.getSession((err: string, result: CognitoSessionModel) => {
    if (err || !result) {
      reject(new Error(`Failure getting Cognito session: ${err}`));
      return;
    }

    // Resolve the promise with the session credentials
    console.debug(`Successfully got session: ${JSON.stringify(result)}`);
    const session = {
      credentials: {
        accessToken: result.accessToken.jwtToken,
        idToken: result.idToken.jwtToken,
        refreshToken: result.refreshToken.token,
      },
      user: {
        userName: result.idToken.payload['cognito:username'],
        email: result.idToken.payload.email,
      },
    };
    resolve(session);
  });
});


// Sign out of the current session (will redirect to signout URI)
const signOutCognitoSession = () => {
  const auth = createCognitoAuth();
  auth.signOut();
};


const login = (
  user: string,
  password: string,
  setUser: Function,
  setCognito: Function,
  remember: boolean,
) => Auth.signIn(user, password)
  .then(data => {
    // Set cookies with access token data
    const { accessToken, idToken, refreshToken } = data.signInUserSession;
    const cognitoCookieLifetime: number = parseInt(`${process.env.REACT_APP_COGNITO_COOKIE_LIFE_TIME}`, 30);

    setCognito({
      CognitoUsername: data.username,
      CognitoAccessToken: accessToken.jwtToken,
      CognitoIdToken: idToken.jwtToken,
      CognitoRefreshToken: refreshToken.token,
      loginDate: new Date(),
    });

    // if (remember) {
    setCookie('CognitoUsername', data.username, cognitoCookieLifetime);
    setCookie('CognitoAccessToken', accessToken.jwtToken, cognitoCookieLifetime);
    setCookie('CognitoIdToken', idToken.jwtToken, cognitoCookieLifetime);
    setCookie('CognitoRefreshToken', refreshToken.token, cognitoCookieLifetime);
    // }


    return setUser({
      username: data.username,
    });
  });

const logout = (setUser: Function, setCognito: Function) => Auth.signOut()
  .then(() => {
    deleteCookie('CognitoUsername');
    deleteCookie('CognitoAccessToken');
    deleteCookie('CognitoIdToken');
    deleteCookie('CognitoRefreshToken');
    deleteCookie('CognitoRedirectCall');
    return setUser({
      username: '',
    });
  }).then(() => setCognito({}));


const getLoggedUser = (): AuthType => ({
  username: getCookie('CognitoUsername'),
});

const isLogged = (): boolean => !!getCookie('CognitoAccessToken');


export {
  createCognitoAuth,
  createCognitoUser,
  createCognitoUserPool,
  getCognitoSession,
  getCognitoSignInUri,
  parseCognitoWebResponse,
  signOutCognitoSession,
  login,
  getLoggedUser,
  isLogged,
  logout,
};


type AuthType = {
  username: string;
}
