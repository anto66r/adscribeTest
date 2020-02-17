// @ts-ignore
import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';
import {
  CognitoRefreshToken,
  CognitoUser, CognitoUserPool, CognitoUserSession,
} from 'amazon-cognito-identity-js';
import Amplify, { Auth } from 'aws-amplify';
import { config as AWSConfig } from 'aws-sdk';

import { secureFetch } from 'helpers/fetching';
import { IUserCollection } from '../../../../server/src/services';
import awsConfig from '../../awsconfig';
import { ICognitoAuthentication } from '../../context/UserContext/types';
import { deleteCookie, getCookie, setCookie } from '../cookies';
import { ILoginResult, ICognitoSessionModel } from './types';


Amplify.configure(awsConfig);

AWSConfig.region = process.env.REACT_APP_COGNITO_REGION;

const tokenScopes = [
  'openid',
  'email',
  'profile',
  'http://localhost:5000/api',
  'http://platf0rm-2-lb-1034170497.eu-west-1.elb.amazonaws.com/api',
  'transactions/api',
  'transactions/post',
  'transactions/get',
  'api',
  'post',
  'get',
];

const {
  REACT_APP_USER_POOL_BASE_URL: userPoolBaseUrl = '',
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

// Sign out of the current session (will redirect to signout URI)
const signOutCognitoSession = () => {
  const auth = createCognitoAuth();
  auth.signOut();
};

const setAuthSession = ({
  cognitoUsername,
  cognitoAccessToken,
  cognitoIdToken,
  cognitoRefreshToken,
}: ICognitoAuthentication) => {
  const cognitoCookieLifetime: number = parseInt(`${process.env.REACT_APP_COGNITO_COOKIE_LIFE_TIME}`, 3600000);
  setCookie('CognitoUsername', cognitoUsername || '', cognitoCookieLifetime);
  setCookie('CognitoAccessToken', cognitoAccessToken || '', cognitoCookieLifetime);
  setCookie('CognitoIdToken', cognitoIdToken || '', cognitoCookieLifetime);
  setCookie('CognitoRefreshToken', cognitoRefreshToken || '', cognitoCookieLifetime);
};

const cleanCookies = () => {
  deleteCookie('CognitoUsername');
  deleteCookie('CognitoAccessToken');
  deleteCookie('CognitoIdToken');
  deleteCookie('CognitoRefreshToken');
  deleteCookie('CognitoRedirectCall');
};

const login = async (
  username: string,
  password: string,
  remember: boolean,
): Promise<ILoginResult> => {
  cleanCookies();

  const data = await Auth.signIn(username, password);

  const { accessToken, idToken, refreshToken } = data.signInUserSession;
  const cognitoUserId = accessToken.jwtToken;

  let user: IUserCollection;
  try {
    // @ts-ignore
    user = await secureFetch({
      endpoint: '/users/login',
      accessToken: cognitoUserId,
      payload: {
        username,
        cognitoId: cognitoUserId,
      },
    });
  } catch (err) {
    throw Error('Cannot sync login data in database');
  }

  // Set cookies with access token datatext/UserContext/index

  const auth: ICognitoAuthentication = {
    cognitoUsername: data.username,
    cognitoAccessToken: cognitoUserId,
    cognitoIdToken: idToken.jwtToken,
    cognitoRefreshToken: refreshToken.token,
    remember,
  };

  if (remember) {
    setAuthSession(auth);
  }

  auth.loginDate = new Date();

  return {
    user,
    auth,
  };
};

const waitForAWSRefreshSession = (cognitoUser: CognitoUser, currentRefreshToken: CognitoRefreshToken, remember: boolean) => new Promise(((resolve, reject) => {
  cognitoUser.refreshSession(currentRefreshToken, (err: Error, session: ICognitoSessionModel) => {
    if (err) reject(err);
    const { idToken, refreshToken, accessToken } = session;
    if (remember) {
      setAuthSession({
        cognitoUsername: getCookie('CognitoUsername'),
        cognitoAccessToken: accessToken.jwtToken,
        cognitoIdToken: idToken.jwtToken,
        cognitoRefreshToken: refreshToken.token,
        remember,
      });
    }
    resolve(session);
    // do whatever you want to do now :)
  });
}));


const refreshSession = async (remember: boolean) => {
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const currentSession: CognitoUserSession = await Auth.currentSession();
    // @ts-ignore
    const currentRefreshToken = currentSession.refreshToken;
    const newSession = await waitForAWSRefreshSession(cognitoUser, currentRefreshToken, remember);
    return newSession as ICognitoSessionModel;
  } catch (e) {
    throw Error('Unable to refresh Token');
  }
};


const logout = (setUserId: Function, setCognito: Function, setLogged: Function) => Auth.signOut()
  .then(() => {
    cleanCookies();
    return setUserId();
  })
  .then(() => setCognito({}))
  .then(() => setLogged(false));


const getLoggedUser = (): AuthType => ({
  username: getCookie('CognitoUsername'),
});

export {
  createCognitoAuth,
  createCognitoUser,
  createCognitoUserPool,
  getCognitoSignInUri,
  parseCognitoWebResponse,
  signOutCognitoSession,
  login,
  getLoggedUser,
  logout,
  cleanCookies,
  refreshSession,
};


type AuthType = {
  username: string;
}
