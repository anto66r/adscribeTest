/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../../helpers/cookies';

const getLogged = (): boolean => !!getCookie('CognitoAccessToken');

// @ts-ignore
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      getLogged()
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

export { PrivateRoute };
