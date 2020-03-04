import React from 'react';

type ChangePasswordButtonType = {
  handleConfirmChangePassword: () => {};
  loading: boolean;
  handleResendCode: () => void;
}

const ChangePasswordButton = ({
  handleConfirmChangePassword,
  loading,
  handleResendCode,
}: ChangePasswordButtonType) => (
  <>
    <button
      type="submit"
      onClick={handleConfirmChangePassword}
      className="btn btn-primary"
      disabled={loading}
    >
      {loading ? 'Please wait...' : 'Change password'}{' '}
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
    <button
      type="button"
      onClick={handleResendCode}
      className="btn btn-secondary"
    >
      Resend code
    </button>
  </>
);

export default ChangePasswordButton;
