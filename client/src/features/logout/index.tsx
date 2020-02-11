import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from 'helpers/cognito';
import { UserContext } from 'context/UserContext';

const Logout = () => {
  const history = useHistory();
  const { setUser, setCognito } = useContext(UserContext);

  useEffect(() => {
    logout(setUser, setCognito)
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
