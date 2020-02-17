import React from 'react';
import { useStore } from 'store';

// Todo: Can't reach props when using history.push() so errorMessage is empty
const ErrorPage = ({ errorMessage, location }: IErrorPage) => {
  const [state] = useStore();
  const error = state.error || location.state.error;

  return (
    <div>
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
