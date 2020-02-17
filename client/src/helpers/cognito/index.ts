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
  login,
  getLoggedUser,
  logout,
  cleanCookies,
  refreshSession,
};


type AuthType = {
  username: string;
}
