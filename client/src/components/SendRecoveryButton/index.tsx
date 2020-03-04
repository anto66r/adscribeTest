import React from 'react';

type SendRecoveryButtonType = {
  handleSendRecoverPassword: () => {};
  loading: boolean;
}

const SendRecoveryButton = ({
  handleSendRecoverPassword,
  loading,
}: SendRecoveryButtonType) => (
  <button
    type="submit"
    onClick={handleSendRecoverPassword}
    className="btn btn-primary"
    disabled={loading}
  >
    {loading ? 'Please wait...' : 'Recover password'}{' '}
    {loading && (
      <div
        className="spinner-border text-light ml-1"
        role="status"
        style={{ width: 20, height: 20 }}
      >
        <span className="sr-only">Recovering password...</span>
      </div>
    )}
  </button>
);

export default SendRecoveryButton;
