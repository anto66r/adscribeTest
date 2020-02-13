import { UserContext } from 'context/UserContext';
import { logout } from 'helpers/cognito';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();
  const { setUser, setCognito, setLogged } = useContext(UserContext);

  useEffect(() => {
    logout(setUser, setCognito, setLogged)
      .then(() => {
        history.push({
          pathname: '/',
        });
      });
  }, [history, setUser]);


  return (
    <div className="container">Loging off...</div>
  );
};


export { Logout };
