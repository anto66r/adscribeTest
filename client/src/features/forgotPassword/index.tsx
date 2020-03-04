import React, { useContext, useState } from 'react';

import '../login/style.scss';
import ResetPasswordForm from 'components/ResetPasswordForm';
import GoToLoginButton from 'components/GoToLoginButton';

import SendRecoveryLinkForm from 'components/SendRecoveryLinkForm';
import ChangePasswordButton from 'components/ChangePasswordButton';
import ErrorMessage from 'ErrorMessage';
import { ErrorContext } from '../../context/ErrorContext';
import SendRecoveryButton from '../../components/SendRecoveryButton';
import { sendPasswordRecovery, sendPasswordRecoveryConfirm } from '../../helpers/cognito/management';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading] = useState(false);
  const [disableUserField, setDisableUserField] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [recoveredPassword, setRecoveredPassword] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [disableFields, setDisableFields] = useState(false);
  const [showSendButton, setShowSendButton] = useState(false);
  const [error, setError] = useState('');

  const { message: errorMessage } = useContext(ErrorContext);

  const emptyFields = () => [email].some(x => !x.length);
  const emptyFieldsConfirm = () => [confirmationCode, password].some(x => !x.length);

  const handleSendRecoverPassword = async () => {
    if (emptyFields()) {
      setError('All fields should be filled');
      return false;
    }

    setDisableUserField(true);
    setDisableFields(false);
    setShowConfirmation(true);
    setError('');

    try {
      await sendPasswordRecovery(email);
      setShowSendButton(true);
    } catch (err) {
      setError(`Error recovering the password: ${err.message}`);
      setShowConfirmation(false);
      setDisableFields(false);
    }
    return true;
  };

  const handleConfirmChangePassword = async () => {
    // TODO: P2-101 Create POC for form field validations
    if (password !== passwordRepeat) {
      setError('Passwords do not match');
      return false;
    }
    if (emptyFieldsConfirm()) {
      setError('All fields should be filled');
      return false;
    }
    setDisableFields(true);
    setError('The password was changed correctly');
    try {
      await sendPasswordRecoveryConfirm(email, confirmationCode, password);
      setError('');
      setRecoveredPassword(true);
    } catch (err) {
      setError(`Error creating a new password: ${err.message}`);
      setDisableFields(false);
    }
    return true;
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="row"
          style={{
            width: 600,
          }}
        >
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
                !recoveredPassword ? (
                  <>
                    {
                        !showConfirmation ? (
                          <SendRecoveryLinkForm
                            email={email}
                            disableFields={disableFields}
                            disableUserField={disableUserField}
                            handleChange={setEmail}
                          />
                        ) : (
                          <>
                            <p className="text-center">
                              A reset password was sent to the associated user email.<br />
                              Add here the reset password sent to the user email and the new password
                            </p>
                            <ResetPasswordForm
                              disableFields={disableFields}
                              resetCode={confirmationCode}
                              password={password}
                              passwordRepeat={passwordRepeat}
                              handleResetCode={setConfirmationCode}
                              handlePassword={setPassword}
                              handlePasswordRepeat={setPasswordRepeat}
                            />

                          </>
                        )
                      }
                    <div className="d-flex justify-content-center mt-3 mb-2">
                      {
                          showSendButton ? (
                            <ChangePasswordButton
                              handleConfirmChangePassword={handleConfirmChangePassword}
                              handleResendCode={() => window.location.reload()}
                              loading={loading}
                            />
                          ) : (
                            <SendRecoveryButton
                              handleSendRecoverPassword={handleSendRecoverPassword}
                              loading={loading}
                            />
                          )
                        }
                    </div>
                  </>
                ) : <GoToLoginButton />
              }
            {
                error && <ErrorMessage message={error} />
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export { ForgotPassword };
