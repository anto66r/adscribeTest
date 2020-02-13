import { bool } from 'aws-sdk/clients/signer';
import { UserContext } from 'context/UserContext';

import { Login } from 'features/login';
import { Logout } from 'features/logout';
import TestApi from 'features/testapi';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ErrorPage } from './features/error/ErrorPage';
import Users from './features/users';
import { getCookie } from './helpers/cookies';

const getLogged = (): boolean => !!getCookie('CognitoAccessToken');

const App = () => {
  const [user, setUser] = useState({
    username: getCookie('CognitoUsername'),
  });
  const [cognito, setCognito] = useState({});
  const [remember, setRemember] = useState(false);
  const [isLogged, setLogged] = useState(getLogged());


  console.log(getLogged());
  return (
    <>
      <Router>
        <UserContext.Provider value={{
          user, setUser, cognito, setCognito, remember, setRemember, isLogged, setLogged,
        }}
        >
          <Route path="/error" component={ErrorPage} />

          {
            !isLogged ? (
              <Route exact path="/" component={Login} />
            ) : (
              <>
                <Header />
                <div className="middle-section-wrapper">
                  <div className="content-wrapper">
                    <Route path="/users" component={Users} />
                    <Route path="/testapi" component={TestApi} />
                    <Route path="/logout" component={Logout} />
                  </div>
                  <Sidebar />

                </div>
                <Footer label="footer" />
              </>
            )
          }

        </UserContext.Provider>
      </Router>
    </>
  );
};

export default App;
