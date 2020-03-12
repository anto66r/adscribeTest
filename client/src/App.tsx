import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StoreProvider } from 'store';
import { PrivateRoute } from 'components/PrivateRoute';
import HealthCheck from 'features/healthCheck';
import { Login } from './features/login';
import { ErrorPage } from './features/error/ErrorPage';
import Main from './features/main';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { NewPassword } from './features/newPassword';
import { ForgotPassword } from './features/forgotPassword';
import { NewAccount } from './features/newAccount';

const App = () => (
  <Router>
    <StoreProvider>
      <Switch>
        <Route path="/error" component={ErrorPage} />
        <Route path="/health-check" component={HealthCheck} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/new-password" component={NewPassword} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/activate-account" component={NewAccount} />
        <PrivateRoute component={Main} />
      </Switch>
    </StoreProvider>
  </Router>
);

export default App;
