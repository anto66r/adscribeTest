import React from 'react';
import { useStore } from 'store';

const ErrorPage = ({ errorMessage, location }: IErrorPage) => {
  const [state] = useStore();
  const error = state.error || location.state?.error || '';
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      Oops, this is an error:<br />
      {error || errorMessage}
    </div>
  );
};

export { ErrorPage };

interface IErrorPage {
  errorMessage: string;
  location: {
    state: {
      error: string;
    };
  };
}
