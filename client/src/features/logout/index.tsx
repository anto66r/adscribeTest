import { UserContext } from 'context/UserContext';
import { logout } from 'helpers/cognito/login';
import React, { useContext, useEffect } from 'react';

const Logout = () => {
  const { setUser, setCognito, setLogged } = useContext(UserContext);

  useEffect(() => {
    logout(setUser, setCognito, setLogged).then(() => {
      window.location.href = '/login';
    });
  }, [setUser, setCognito, setLogged]);

  return <div className="container">Loging off...</div>;
};

export { Logout };
