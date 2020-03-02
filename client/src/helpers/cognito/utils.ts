/* eslint-disable no-bitwise */

import { ICognitoAuthentication } from '../../context/UserContext/types';
import { deleteCookie, setCookie } from '../cookies';

export const setAuthSession = ({
  cognitoEmail,
  cognitoAccessToken,
  authIdToken,
  cognitoRefreshToken,
  authId,
  userId,
}: ICognitoAuthentication) => {
  const cognitoCookieLifetime: number = parseInt(`${process.env.REACT_APP_COGNITO_COOKIE_LIFE_TIME}`, 3600000);
  setCookie('CognitoEmail', cognitoEmail || '', cognitoCookieLifetime);
  setCookie('CognitoAccessToken', cognitoAccessToken || '', cognitoCookieLifetime);
  setCookie('authIdToken', authIdToken || '', cognitoCookieLifetime);
  setCookie('CognitoRefreshToken', cognitoRefreshToken || '', cognitoCookieLifetime);
  setCookie('authId', authId || '', cognitoCookieLifetime);
  setCookie('UserId', userId || '', cognitoCookieLifetime);
};

export const cleanCookies = () => {
  deleteCookie('CognitoEmail');
  deleteCookie('CognitoAccessToken');
  deleteCookie('authIdToken');
  deleteCookie('CognitoRefreshToken');
  deleteCookie('CognitoRedirectCall');
  deleteCookie('authId');
  deleteCookie('UserId');
};
