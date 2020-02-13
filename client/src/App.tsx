import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import { StoreProvider } from 'store';
import reducers from 'store/reducers';
import initialState from 'store/initialState';
import Main from 'features/Main';

import { PrivateRoute } from 'components/PrivateRoute';
import { Login } from './features/login';
import { ErrorPage } from './features/error/ErrorPage';

const App = () => (
  <Router>
    <StoreProvider initialState={initialState} reducer={reducers}>
      <Switch>
        <Route path="/error" component={ErrorPage} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute component={Main} />
      </Switch>
    </StoreProvider>
  </Router>
);

export default App;
