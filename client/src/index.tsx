import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { LoginCallback } from './containers/LoginCallback';
import { Index } from './containers/TestApi';


const routing = (
  <>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/login/callback" component={LoginCallback} />
        <Route path="/test" component={Index} />
      </div>
    </Router>
  </>

);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
