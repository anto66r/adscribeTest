import React, { ElementType, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStore } from 'store';
import { IUserState } from 'types/user';
import { setUser } from 'store/actions';
import { getCookie } from '../../helpers/cookies';

const getLogged = (user: IUserState): boolean => !!user?.auth?.cognitoAccessToken || !!getCookie('CognitoAccessToken');

type PrivateRouteProps = {
  component: ElementType;
}

const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  const [state, dispatch] = useStore();
  const { user } = state;

  useEffect(() => {
    if (!Object.keys(user).length) {
      dispatch(setUser(
        {
          username: getCookie('CognitoUsername'),
          isLogged: true,
        },
      ));
    }
  }, []);

  return (
    <Route
      render={props => (
        getLogged(user)
          // eslint-disable-next-line react/jsx-props-no-spreading
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  );
};

export { PrivateRoute };
