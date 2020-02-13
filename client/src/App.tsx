import { Login } from 'features/login';
import { Logout } from 'features/logout';
import TestApi from 'features/testapi';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import { StoreProvider } from 'store';
import reducers from 'store/reducers';
import initialState from 'store/initialState';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ErrorPage } from './features/error/ErrorPage';
import Users from './features/users';
import { getCookie } from './helpers/cookies';

const getLogged = (): boolean => !!getCookie('CognitoAccessToken');

const App = () => (
  <>
    <Router>
      <StoreProvider initialState={initialState} reducer={reducers}>
        <Route path="/error" component={ErrorPage} />

        {
          !getLogged() ? (
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
      </StoreProvider>
    </Router>
  </>
);

export default App;
