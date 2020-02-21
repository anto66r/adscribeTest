import {
  CognitoRefreshToken,
  CognitoUser, CognitoUserSession,
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
  cognitoId,
  userId,
}: ICognitoAuthentication) => {
  const cognitoCookieLifetime: number = parseInt(`${process.env.REACT_APP_COGNITO_COOKIE_LIFE_TIME}`, 3600000);
  setCookie('CognitoUsername', cognitoUsername || '', cognitoCookieLifetime);
  setCookie('CognitoAccessToken', cognitoAccessToken || '', cognitoCookieLifetime);
  setCookie('CognitoIdToken', cognitoIdToken || '', cognitoCookieLifetime);
  setCookie('CognitoRefreshToken', cognitoRefreshToken || '', cognitoCookieLifetime);
  setCookie('CognitoId', cognitoId || '', cognitoCookieLifetime);
  setCookie('UserId', userId || '', cognitoCookieLifetime);
};

const cleanCookies = () => {
  deleteCookie('CognitoUsername');
  deleteCookie('CognitoAccessToken');
  deleteCookie('CognitoIdToken');
  deleteCookie('CognitoRefreshToken');
  deleteCookie('CognitoRedirectCall');
  deleteCookie('CognitoId');
  deleteCookie('UserId');
};

const getUserSession = () => {
  const userId = getCookie('UserId');
  const username = getCookie('CognitoUsername');
  return {
    userId,
    isLogged: true,
    username,
    auth: {
      cognitoUsername: getCookie('CognitoUsername'),
      cognitoId: getCookie('CognitoId'),
      cognitoAccessToken: getCookie('CognitoAccessToken'),
      cognitoIdToken: getCookie('CognitoIdToken'),
      cognitoRefreshToken: getCookie('CognitoRefreshToken'),
      userId,
    },
  };
};

const login = async (
  username: string,
  password: string,
): Promise<ILoginResult> => {
  cleanCookies();
  const data = await Auth.signIn(username, password);
  const { accessToken, idToken, refreshToken } = data.signInUserSession;
  const { sub } = data.attributes;
  let user: IUserCollection;
  try {
    // @ts-ignore
    user = await secureFetch({
      endpoint: '/users/login',
      accessToken,
      payload: {
        username,
        cognitoId: sub,
      },
    });
  } catch (err) {
    throw Error('Cannot connect with server');
  }

  // Set cookies with access token datatext/UserContext/index

  const auth: ICognitoAuthentication = {
    cognitoUsername: data.username,
    cognitoId: sub,
    cognitoAccessToken: accessToken.jwtToken,
    cognitoIdToken: idToken.jwtToken,
    cognitoRefreshToken: refreshToken.token,
    userId: user.data[0]._id || '',
  };
  // accessToken empty
  setAuthSession(auth);
  auth.loginDate = new Date();
  return {
    user,
    auth,
  };
};

const waitForAWSRefreshSession = (cognitoUser: CognitoUser, currentRefreshToken: CognitoRefreshToken) => new Promise(((resolve, reject) => {
  cognitoUser.refreshSession(currentRefreshToken, (err: Error, session: ICognitoSessionModel) => {
    if (err) reject(err);
    const { idToken, refreshToken, accessToken } = session;

    setAuthSession({
      cognitoUsername: getCookie('CognitoUsername'),
      cognitoId: getCookie('CognitoId'),
      userId: getCookie('UserId'),
      cognitoAccessToken: accessToken.jwtToken,
      cognitoIdToken: idToken.jwtToken,
      cognitoRefreshToken: refreshToken.token,
    });
    resolve(session);
    // do whatever you want to do now :)
  });
}));

const refreshSession = async () => {
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const currentSession: CognitoUserSession = await Auth.currentSession();
    // @ts-ignore
    const currentRefreshToken = currentSession.refreshToken;
    const newSession = await waitForAWSRefreshSession(cognitoUser, currentRefreshToken);
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

export {
  login,
  logout,
  cleanCookies,
  refreshSession,
  getUserSession,
};


type AuthType = {
  username: string;
}
