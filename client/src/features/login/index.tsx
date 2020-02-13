import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCookie } from 'helpers/cookies';
import { UserContext } from '../../context/UserContext';
import { login } from '../../helpers/cognito';

const Login = () => {
  const [userForm, setUserForm] = useState('');
  const [password, setPassword] = useState('');
  const [rememberForm, setRememberForm] = useState(false);
  const history = useHistory();

  const { setUser, setCognito, setRemember } = useContext(UserContext);

  useEffect(() => {
    setRemember(rememberForm);
  }, [rememberForm, setRemember]);

  const doLogin = () => {
    login(userForm, password, setUser, setCognito, rememberForm)
      .then(() => {
        const redirectTo = getCookie('CognitoRedirectCall');
        // return here to CognitoRedirectCall
        history.push({
          pathname: redirectTo,
        });
      })
      .catch(err => {
        history.push({
          pathname: '/error',
          state: { errorMessage: err.message },
        });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <label>User</label>
            <input
              type="email"
              className="form-control"
              name="user"
              value={userForm}
              aria-describedby="emailHelp"
              onChange={e => setUserForm(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              checked={rememberForm}
              onChange={e => setRememberForm(e.target.checked)}
            />
            <label className="form-check-label">Stay logged in</label>
          </div>
          <button type="submit" onClick={doLogin} className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export { Login };
