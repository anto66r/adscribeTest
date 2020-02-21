import { UserContext } from 'context/UserContext';
import { logout } from 'helpers/cognito';
import React, { useContext, useEffect } from 'react';

const Logout = () => {
  const { setUser, setCognito, setLogged } = useContext(UserContext);

  useEffect(() => {
    logout(setUser, setCognito, setLogged).then(() => {
      window.location.href = '/login';
    });
  }, []);

  return <div className="container">Loging off...</div>;
};

export { Logout };
