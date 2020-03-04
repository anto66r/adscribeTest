import React from 'react';

type ErrorMessageType = {
  message: string;
}

const ErrorMessage = ({
  message,
}: ErrorMessageType) => (
  <div className="d-flex justify-content-center">
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
