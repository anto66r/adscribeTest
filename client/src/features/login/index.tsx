import { getCookie } from 'helpers/cookies';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  setUser,
} from 'store/actions';
import './style.scss';
import LoginForm from 'components/LoginForm';

import { resendSignUp, confirmSignUp } from 'helpers/cognito/management';
import { login } from 'helpers/cognito/login';
import ErrorMessage from 'ErrorMessage';
import ConfirmCodeForm from '../../components/ConfirmCodeForm';
import { ErrorContext } from '../../context/ErrorContext';
import { useStore } from '../../store';
import { ERROR_NEW_PASSWORD_REQUIRED, ERROR_USER_NOT_CONFIRMED } from './constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const [resendSignUpData, setResendSignUpData] = useState();
  const [confirmationCode, setConfirmationCode] = useState('');


  const [, dispatch] = useStore();
  const [message, setMessage] = useState('');

  const history = useHistory();
  const { message: errorMessage } = useContext(ErrorContext);

  const handleLogin = async (): Promise<void> => {
    setIsLogging(true);
    setMessage('');

    try {
      const foundUser = await login(email, password);
      const { user, auth } = foundUser;
      dispatch(setUser({
        userId: user.data[0].id,
        isLogged: true,
        email: foundUser.auth.cognitoEmail,
        auth,
      }));
      // return here to CognitoRedirectCall
      const redirectTo = getCookie('CognitoRedirectCall');
      history.push(redirectTo === '/login' ? '' : redirectTo);
    } catch (err) {
      if (err.code === ERROR_NEW_PASSWORD_REQUIRED) {
        history.push({
          pathname: '/new-password',
          state: { newPasswordRequired: true },
        });
      } else if (err.code === ERROR_USER_NOT_CONFIRMED) {
        const resendResult = await resendSignUp(email);

        setResendSignUpData(resendResult);
        setMessage('');
      }
      setMessage(err.message);
      setIsLogging(false);
    }
  };

  const handleConfirm = async () => {
    setIsLogging(true);
    setMessage('');

    try {
      await confirmSignUp(email, confirmationCode);
      setMessage('User is confirmed correctly. Please, login again');
      setResendSignUpData(undefined);
    } catch (err) {
      setMessage(`Cannot confirm user: ${err.message}`);
    }
    setIsLogging(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="d-flex justify-content-center mb-4">
              <img
                src="/logo/adscribe-full-black.png"
                width="200"
                alt="adscribe"
              />
            </div>
            {
              !resendSignUpData ? (
                <LoginForm
                  email={email}
                  handleLogin={handleLogin}
                  isLogging={isLogging}
                  password={password}
                  setEmail={setEmail}
                  setPassword={setPassword}
                />
              ) : (
                <ConfirmCodeForm

                  isLogging={isLogging}
                  confirmationCode={confirmationCode}
                  handleConfirm={handleConfirm}
                  setConfirmationCode={setConfirmationCode}
                />
              )
            }
            {
              message && <ErrorMessage message={message} />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
