import React, { useContext, useState } from 'react';

import '../login/style.scss';

import GoToLoginButton from 'components/GoToLoginButton';
import ResetPasswordForm from '../../components/ResetPasswordForm';

import { ErrorContext } from '../../context/ErrorContext';
import {
  confirmSignUp,
  resendSignUp,
  sendPasswordRecovery,
  sendPasswordRecoveryConfirm,
} from '../../helpers/cognito/management';
import ErrorMessage from '../../ErrorMessage';

const NewAccount = ({ location }: NewAccountType) => {
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [disableFields, setDisableFields] = useState(false);
  const [message, setMessage] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [recoveredPassword, setRecoveredPassword] = useState(false);

  const { message: errorMessage } = useContext(ErrorContext);

  const emptyFields = () => [email, confirmationCode].some(x => !x.length);
  const emptyFieldsConfirm = () => [confirmationCode, password].some(x => !x.length);
  const emptyFieldsResend = () => [email].some(x => !x.length);

  const handleResendCode = async (): Promise<boolean> => {
    setDisableFields(true);
    setMessage('');

    if (emptyFieldsResend()) {
      setMessage('The email field should be filled');
      setDisableFields(false);
      return false;
    }

    try {
      await resendSignUp(email);
      setDisableFields(false);
      setMessage('The confirmation code was sent to the user email');
    } catch (err) {
      setMessage(`Error resending the confirmation code: ${err.message}`);
      setDisableFields(false);
    }
    return true;
  };

  const handleCreatePassword = async (): Promise<boolean> => {
    setDisableFields(true);
    setMessage('');
    if (emptyFieldsConfirm()) {
      setMessage('All fields should be filled');
      setDisableFields(false);
      return false;
    }

    try {
      await sendPasswordRecoveryConfirm(email, confirmationCode, password);
      setMessage('The password was changed correctly');
      setRecoveredPassword(true);
    } catch (err) {
      setMessage(`Error creating a new password: ${err.message}`);
      setDisableFields(false);
    }
    return true;
  };

  const handleConfirmAccount = async (): Promise<boolean> => {
    setDisableFields(true);
    setMessage('');

    if (emptyFields()) {
      setMessage('All fields should be filled');
      setDisableFields(false);
      return false;
    }

    try {
      await confirmSignUp(email, confirmationCode);
      await sendPasswordRecovery(email);
      setDisableFields(false);
      setShowLogin(true);
      setMessage('');
    } catch (err) {
      setMessage(`Error confirming the user: ${err.message}`);
      setDisableFields(false);
    }
    return true;
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
              !showLogin ? (
                <div className="centeredText align-items-center justify-content-center">
                  <p className="text-center">
                    In order to activate an account it should be previously created by an admin.<br />
                    If it was created please enter here your email and the confirmation code that was sent to the user email
                  </p>
                  <div className="justify-content-center form-inline">
                    <label>Email</label>
                    <input
                      disabled={disableFields}
                      type="text"
                      className="form-control d-lg-inline-block"
                      name="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />

                  </div>
                  <div className="justify-content-center form-inline">
                    <label>Confirmation code</label>
                    <input
                      disabled={disableFields}
                      type="text"
                      className="form-control d-lg-inline-block"
                      name="confirmationCode"
                      value={confirmationCode}
                      onChange={e => setConfirmationCode(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-center mt-3 mb-2">

                    <>
                      <button
                        type="submit"
                        onClick={handleConfirmAccount}
                        className="btn btn-primary"
                        disabled={disableFields}
                      >
                        Confirm account
                      </button>
                      <button
                        type="submit"
                        onClick={handleResendCode}
                        className="btn btn-secondary"
                        disabled={disableFields}
                      >
                        Resend confirmation code
                      </button>
                    </>
                  </div>
                </div>
              ) : (
                <>
                  {
                    !recoveredPassword ? (
                      <>
                        <div className="mb-3 centeredText">The account has been activated. We have sent a code for creating a new password.<br />
                          Please enter here the reset code
                        </div>
                        <ResetPasswordForm
                          disableFields={disableFields}
                          resetCode={resetCode}
                          password={password}
                          passwordRepeat={passwordRepeat}
                          handleResetCode={setResetCode}
                          handlePassword={setPassword}
                          handlePasswordRepeat={setPasswordRepeat}
                        />
                        <div className="mt-3 mb-3 text-center">
                          <button
                            type="button"
                            onClick={handleCreatePassword}
                            className="btn btn-primary"
                          >
                            Create new password
                          </button>
                        </div>
                      </>
                    ) : (
                      <GoToLoginButton />
                    )
                  }

                </>
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

type NewAccountType = {
  location: {
    state: {
      newPasswordRequired: boolean;
    };
  };

}

export { NewAccount };
