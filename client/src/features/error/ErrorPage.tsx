import React from 'react';

// Todo: Can't reach props when using history.push() so errorMessage is empty
const ErrorPage = ({ errorMessage }: IErrorPage) => (
  <div>
    Oops, this is an error:<br />
    {errorMessage}
  </div>
);

export { ErrorPage };

interface IErrorPage {
  errorMessage: string;
}
