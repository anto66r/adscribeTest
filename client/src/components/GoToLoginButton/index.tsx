import React from 'react';
import { useHistory } from 'react-router-dom';

type GoToLoginButtonType = {
  message?: string;
}

const defaultMessage = 'The password has been changed. Please go to login page';

const GoToLoginButton = ({ message = defaultMessage }: GoToLoginButtonType) => {
  const history = useHistory();

  return (
    <div className="text-center justify-content-center mb-4">
      <div className="mb-3">{message}</div>
      <button
        type="button"
        onClick={() => history.push('/login')}
        className="btn btn-primary"
      >
        Go to Login page
      </button>
    </div>
  );
};

export default GoToLoginButton;
