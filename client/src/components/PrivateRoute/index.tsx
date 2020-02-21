import { getUserSession } from 'helpers/cognito';
import { useFetch } from 'hooks';
import React, { ElementType, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStore } from 'store';
import { IUserState } from 'types/userState';
import { setUser, setUserContext } from 'store/actions';
import { getCookie } from 'helpers/cookies';
import Loading from 'components/Loading';

const isLogged = (user: IUserState): boolean => !!user?.auth?.cognitoAccessToken || !!getCookie('CognitoAccessToken');

const hasStateLoaded = (state: any) => state?.domains && Object.keys(state.domains).length;

const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  const [state, dispatch] = useStore();
  const { user } = state;
  const { auth } = user;
  const { data, loading, doFetch } = useFetch();

  useEffect(() => {
    if (auth && !Object.keys(auth).length) {
      const sessionUser = getUserSession();
      dispatch(setUser(sessionUser));
    }
  }, []);

  useEffect(() => {
    if (!hasStateLoaded(state) && user.userId) {
      doFetch({
        endpoint: '/users/context',
        payload: {
          _id: state.user.userId,
        },
      });
    }
  }, [user]);

  useEffect(() => {
    if (Object.keys(data).length) {
      dispatch(setUserContext(data));
    }
  }, [data]);

  return (
    <Route
      render={props => {
        if (!isLogged(user)) {
          return <Redirect to="/login" />;
        }
        if (hasStateLoaded(state)) {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <Component {...props} />;
        }
        if (loading) {
          return (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Loading />
            </div>
          );
        }
        return null;
      }}
    />
  );
};

export { PrivateRoute };

type PrivateRouteProps = {
  component: ElementType;
}
