import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StoreProvider } from 'store';
import { PrivateRoute } from 'components/PrivateRoute';
import { Login } from './features/login';
import { ErrorPage } from './features/error/ErrorPage';
import Main from './features/main';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Router>
    <StoreProvider>
      <Switch>
        <Route path="/error" component={ErrorPage} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute component={Main} />
      </Switch>
    </StoreProvider>
  </Router>
);

export default App;
