import React, { Dispatch, SetStateAction } from 'react';

type ConfirmCodeFormType = {
  confirmationCode: string;
  setConfirmationCode: Dispatch<SetStateAction<string>>;
  isLogging: boolean;
  handleConfirm: () => {};
}

const ConfirmCodeForm = ({
  confirmationCode,
  setConfirmationCode,
  isLogging,
  handleConfirm,
}: ConfirmCodeFormType) => (
  <>
    <p>A code was sent to the selected email.<br />Please enter the confirmation code below</p>
    <div className="form-inline">
      <label>Confirmation code</label>
      <input
        type="text"
        className="form-control d-lg-inline-block"
        name="confirmationCode"
        value={confirmationCode}
        onChange={e => setConfirmationCode(e.target.value)}
      />
    </div>
    <div className="d-flex justify-content-center mt-3 mb-2">
      <button
        type="submit"
        onClick={handleConfirm}
        className="btn btn-primary"
        disabled={isLogging}
      >
        {isLogging ? 'Please wait...' : 'Confirm code'}{' '}
        {isLogging && (
        <div
          className="spinner-border text-light ml-1"
          role="status"
          style={{ width: 20, height: 20 }}
        >
          <span className="sr-only">Confirming...</span>
        </div>
        )}
      </button>
    </div>
  </>
);

export default ConfirmCodeForm;
