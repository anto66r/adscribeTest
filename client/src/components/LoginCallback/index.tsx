import React from 'react';
import { useHistory } from 'react-router-dom';
import { parseCognitoWebResponse, getCognitoSession } from '../../helpers/cognito';
import { setCookie, getCookie } from '../../helpers/cookies';

type CredentialsModel = {
  credentials: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  };
  user: {
    userName: string;
    email: string;
  };
}

const LoginCallback = () => {
  const history = useHistory();

  parseCognitoWebResponse(window.location.href) // parse the callback URL
    .then(() => getCognitoSession()) // get a new session
    .then((session) => {
      const credentialsModel = (session as CredentialsModel);
      const { credentials } = credentialsModel;
      const cognitoCookieLifetime: number = parseInt(`${process.env.REACT_APP_COGNITO_COOKIE_LIFE_TIME}`, 30);

      setCookie('CognitoAccessToken', credentials.accessToken, cognitoCookieLifetime);
      setCookie('CognitoIdToken', credentials.idToken, cognitoCookieLifetime);
      setCookie('CognitoRefreshToken', credentials.refreshToken, cognitoCookieLifetime);
      const redirectUrl: string = getCookie('CognitoRedirectCall');
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    })
    .catch((errorMessage) => {
      history.push({
        pathname: '/error',
        state: { errorMessage },
      });
    });

  return (
    <div>
      Hallo! Logged!
    </div>
  );
};

export { LoginCallback };
