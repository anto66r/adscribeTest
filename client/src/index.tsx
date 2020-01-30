import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import { Route, BrowserRouter as Router } from 'react-router-dom'

import { CognitoExampleCallback } from './containers/LoginCallback';
import { CognitoExample } from './containers/CognitoExample';
import { TestApi } from './containers/TestApi/TestApi';


const routing = (
  <Router>
    <div>
      <Route exact path="/"  component={App} />
      <Route exact path="/login" component={CognitoExample} />
      <Route path="/login/callback" component={CognitoExampleCallback} />
      <Route path="/test" component={TestApi} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
