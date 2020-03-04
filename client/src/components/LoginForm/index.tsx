import React, { Dispatch, SetStateAction } from 'react';

type LoginFormType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  handleLogin: () => {};
  isLogging: boolean;
}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  isLogging,
}: LoginFormType) => (
  <>
    <div className="form-inline" style={{ width: 600 }}>
      <label>Email</label>
      <input
        type="email"
        className="form-control d-lg-inline-block"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
    </div>
    <div className="form-inline">
      <label>Password</label>
      <input
        type="password"
        className="form-control d-lg-inline-block"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

    </div>
    <div className="mt-3 justify-content-center form-inline">
      <a className="ml-3" href="/forgot-password">forgot password?</a>
    </div>

    <div className="mt-3" style={{ textAlign: 'center' }} />
    <div className="d-flex justify-content-center mt-3 mb-2">
      <button
        type="submit"
        onClick={handleLogin}
        className="btn btn-primary"
        disabled={isLogging}
      >
        {isLogging ? 'Please wait...' : 'Login'}{' '}
        {isLogging && (
        <div
          className="spinner-border text-light ml-1"
          role="status"
          style={{ width: 20, height: 20 }}
        >
          <span className="sr-only">Loading...</span>
        </div>
        )}
      </button>
    </div>
  </>
);

export default LoginForm;
