import {
  CognitoRefreshToken,
  CognitoUser, CognitoUserSession,
} from 'amazon-cognito-identity-js';

import { secureFetch } from 'helpers/fetching';
import ClientError from 'helpers/ClientError';
import { Auth } from 'aws-amplify';
import { IUserCollection } from '../../../../server/src/services';
import { ICognitoAuthentication } from '../../context/UserContext/types';
import { getCookie } from '../cookies';
import { ILoginResult, ICognitoSessionModel } from './types';
import { ERROR_NEW_PASSWORD_AUTH } from './constants';
import { setAuthSession, cleanCookies } from './utils';

export const getUserSession = () => {
  const userId = getCookie('UserId');
  const email = getCookie('CognitoEmail');
  return {
    userId,
    isLogged: true,
    email,
    auth: {
      cognitoEmail: getCookie('CognitoEmail'),
      authId: getCookie('authId'),
      cognitoAccessToken: getCookie('CognitoAccessToken'),
      authIdToken: getCookie('authIdToken'),
      cognitoRefreshToken: getCookie('CognitoRefreshToken'),
      userId,
    },
  };
};

export const login = async (
  email: string,
  password: string,
): Promise<ILoginResult> => {
  cleanCookies();
  const data = await Auth.signIn(email, password);
  if (data.challengeName === ERROR_NEW_PASSWORD_AUTH) {
    throw new ClientError('New pasword is required', data.challengeName);
  }

  const { accessToken, idToken, refreshToken } = data.signInUserSession;
  const { sub } = data.attributes;
  let user: IUserCollection;
  try {
    // @ts-ignore
    user = await secureFetch({
      endpoint: '/users/login',
      accessToken: accessToken.jwtToken,
      payload: {
        email,
        authId: sub,
      },
    });
  } catch (err) {
    throw new ClientError('Cannot connect with server');
  }


  // Set cookies with access token datatext/UserContext/index

  const auth: ICognitoAuthentication = {
    cognitoEmail: data.username,
    authId: sub,
    cognitoAccessToken: accessToken.jwtToken,
    authIdToken: idToken.jwtToken,
    cognitoRefreshToken: refreshToken.token,
    userId: user.data[0].id || '',
  };
  // accessToken empty
  setAuthSession(auth);
  auth.loginDate = new Date();
  return {
    user,
    auth,
  };
};

export const waitForAWSRefreshSession = (cognitoUser: CognitoUser, currentRefreshToken: CognitoRefreshToken) => new Promise(((resolve, reject) => {
  cognitoUser.refreshSession(currentRefreshToken, (err: Error, session: ICognitoSessionModel) => {
    if (err) reject(err);
    const { idToken, refreshToken, accessToken } = session;

    setAuthSession({
      cognitoEmail: getCookie('CognitoEmail'),
      authId: getCookie('authId'),
      userId: getCookie('UserId'),
      cognitoAccessToken: accessToken.jwtToken,
      authIdToken: idToken.jwtToken,
      cognitoRefreshToken: refreshToken.token,
    });
    resolve(session);
  });
}));

export const refreshSession = async (): Promise<ICognitoSessionModel> => {
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const currentSession: CognitoUserSession = await Auth.currentSession();
    // @ts-ignore
    const currentRefreshToken = currentSession.refreshToken;
    const newSession = await waitForAWSRefreshSession(cognitoUser, currentRefreshToken);
    return newSession as ICognitoSessionModel;
  } catch (err) {
    throw new ClientError(err.message);
  }
};

export const logout = (setUserId: Function, setCognito: Function, setLogged: Function) => Auth.signOut()
  .then(() => {
    cleanCookies();
    return setUserId();
  })
  .then(() => setCognito({}))
  .then(() => setLogged(false));
