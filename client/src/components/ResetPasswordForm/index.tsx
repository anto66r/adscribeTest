import React, { Dispatch, SetStateAction } from 'react';

// TODO: P2-105 Change the nomenclature of PropTypes
type ResetPasswordFormType = {
  disableFields?: boolean;
  resetCode?: string;
  handleResetCode?: Dispatch<SetStateAction<string>>;
  password: string;
  handlePassword: Dispatch<SetStateAction<string>>;
  passwordRepeat: string;
  handlePasswordRepeat: Dispatch<SetStateAction<string>>;
  currentPassword?: string;
  handleCurrentPassword?: Dispatch<SetStateAction<string>>;
}

const ResetPasswordForm = ({
  disableFields = false,
  resetCode,
  handleResetCode,
  password,
  handlePassword, passwordRepeat,
  handlePasswordRepeat,
  currentPassword,
  handleCurrentPassword,
}: ResetPasswordFormType) => (
  <>
    {
        handleResetCode ? (
          <div className="form-inline">
            <label>Reset password code</label>
            <input
              disabled={disableFields}
              type="text"
              className="form-control d-lg-inline-block"
              name="resetCode"
              value={resetCode}
              onChange={e => handleResetCode(e.target.value)}
            />
          </div>
        ) : null
      }
    {
        handleCurrentPassword ? (
          <div className="form-inline">
            <label>Temporary Password</label>
            <input
              disabled={disableFields}
              type="password"
              className="form-control d-lg-inline-block"
              name="password"
              value={currentPassword}
              onChange={e => handleCurrentPassword(e.target.value)}
            />
          </div>
        ) : null
      }
    <div className="form-inline">
      <label>New Password</label>
      <input
        disabled={disableFields}
        type="password"
        className="form-control d-lg-inline-block"
        name="password"
        value={password}
        onChange={e => handlePassword(e.target.value)}
      />
    </div>
    <div className="form-inline">
      <label>New Password (repeat)</label>
      <input
        disabled={disableFields}
        type="password"
        className="form-control d-lg-inline-block"
        name="passwordRepeat"
        value={passwordRepeat}
        onChange={e => handlePasswordRepeat(e.target.value)}
      />
    </div>
  </>
);

export default ResetPasswordForm;
