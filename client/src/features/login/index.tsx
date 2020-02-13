import { getCookie } from 'helpers/cookies';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { setUsers } from 'store/actions';
import { ErrorContext } from '../../context/ErrorContext';
import { UserContext } from '../../context/UserContext';
import { login } from '../../helpers/cognito';
import './style.scss';
import { useStore } from '../../store';

const Login = () => {
  const [userForm, setUserForm] = useState('');
  const [password, setPassword] = useState('');
  const [rememberForm, setRememberForm] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const {
    setUser, setCognito, setRemember, setLogged,
  } = useContext(
    UserContext,
  );

  const [state, dispatch] = useStore();

  useEffect(() => {
    setRemember(rememberForm);
  }, [rememberForm, setRemember]);

  const history = useHistory();
  const { message: errorMessage } = useContext(ErrorContext);

  const doLogin = async () => {
    setIsLogging(true);
    const foundUser = await login(
      userForm,
      password,
      setUser,
      setCognito,
      setLogged,
      rememberForm,
    )
      .then(() => {
        // return here to CognitoRedirectCall
        // const redirectTo = getCookie('CognitoRedirectCall');

        history.push('/users');
      })
      .catch(err => {
        history.push({
          pathname: '/error',
          state: { errorMessage: err.message },
        });
      });

    dispatch(setUsers(foundUser));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="row">
        <div className="col">
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <div className="d-flex justify-content-center mb-4">
            <img
              src="/logo/adscribe-full-black.png"
              width="200"
              alt="adscribe"
            />
          </div>
          <div className="form-inline">
            <label>User</label>
            <input
              type="email"
              className="form-control d-lg-inline-block"
              name="user"
              value={userForm}
              aria-describedby="emailHelp"
              onChange={e => setUserForm(e.target.value)}
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
          {/**
            <div className="mt-3" style={{textAlign: 'center'}}>
              <input type="checkbox" className="form-check-input" id="remember" checked={rememberForm}
                     onChange={e => setRememberForm(e.target.checked)}/>
              <label className="form-check-label">Stay logged in</label>
            </div>
            */}

          <div className="d-flex justify-content-center mt-3 mb-2">
            <button
              type="submit"
              onClick={doLogin}
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
        </div>
      </div>
    </div>
  );
};

export { Login };
