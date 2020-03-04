import React, { Dispatch, SetStateAction } from 'react';

type SendRecoveryLinkFormType = {
  disableUserField: boolean;
  disableFields: boolean;
  email: string;
  handleChange: Dispatch<SetStateAction<string>>;
}

const SendRecoveryLinkForm = ({
  disableUserField,
  disableFields,
  email,
  handleChange,
}: SendRecoveryLinkFormType) => (
  <>
    <p className="text-center">
      Enter here your email. A recovery link will be sent if the user exists
    </p>
    <div className="form-inline">
      <label>Email</label>
      <input
        disabled={disableUserField || disableFields}
        type="text"
        className="form-control d-lg-inline-block"
        name="email"
        value={email}
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  </>
);

export default SendRecoveryLinkForm;
