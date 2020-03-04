import React, { useContext, useState } from 'react';

import GoToLoginButton from 'components/GoToLoginButton';

import { ErrorContext } from '../../context/ErrorContext';
import '../login/style.scss';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import { changePassword, completeNewPassword } from '../../helpers/cognito/management';
import ErrorMessage from '../../ErrorMessage';

const NewPassword = ({ location }: NewPassswordType) => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [loading] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [message, setMessage] = useState('');

  const newPasswordRequired = location?.state?.newPasswordRequired || false;

  const { message: errorMessage } = useContext(ErrorContext);

  const emptyFields = () => [email, currentPassword, password, passwordRepeat].some(x => !x.length);

  const validateForm = () => {
    if (emptyFields()) {
      setMessage('All fields should be filled');
      return false;
    }
    if (password !== passwordRepeat) {
      setMessage('Passwords do not match');
      return false;
    }
    return true;
  };

  const doCreateNewPassword = async (): Promise<boolean> => {
    if (!validateForm()) return false;
    try {
      await completeNewPassword(email, currentPassword, password);
      setMessage('');
      setPasswordChanged(true);
      setShowLoginButton(true);
    } catch (err) {
      setMessage(`Error changing the new password: ${err.message}`);
    }
    return true;
  };

  const doChangePassword = async (): Promise<boolean> => {
    if (!validateForm()) return false;
    try {
      await changePassword(email, currentPassword, password);
      setMessage('');
      setPasswordChanged(true);
      setShowLoginButton(true);
    } catch (err) {
      setMessage(`Error changing the new password: ${err.message}`);
    }
    return true;
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="row" style={{ width: 600 }}>
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
              !passwordChanged ? (
                <>
                  <p className="text-center">{newPasswordRequired
                    ? 'New password is required. Please update your credentials'
                    : 'Change the user credentials and press "Change"'}
                  </p>
                  <div className="form-inline">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control d-lg-inline-block"
                      name="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <ResetPasswordForm
                    currentPassword={currentPassword}
                    handleCurrentPassword={setCurrentPassword}
                    password={password}
                    handlePassword={setPassword}
                    passwordRepeat={passwordRepeat}
                    handlePasswordRepeat={setPasswordRepeat}
                  />
                </>
              ) : (
                <p className="text-center">Password changed correctly. Please go to login page</p>
              )
            }

            <div className="mt-3" style={{ textAlign: 'center' }} />
            <div className="d-flex justify-content-center mt-3 mb-2">
              {
                showLoginButton ? (
                  <GoToLoginButton message="" />
                ) : (
                  <button
                    type="submit"
                    onClick={newPasswordRequired ? doCreateNewPassword : doChangePassword}
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Please wait...' : 'Change'}{' '}
                    {loading && (
                      <div
                        className="spinner-border text-light ml-1"
                        role="status"
                        style={{ width: 20, height: 20 }}
                      >
                        <span className="sr-only">Changing password...</span>
                      </div>
                    )}
                  </button>
                )
              }

            </div>
            {
              message && <ErrorMessage message={message} />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

type NewPassswordType = {
  location: {
    state: {
      newPasswordRequired: boolean;
    };
  };

}

export { NewPassword };
