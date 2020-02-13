import React, { useReducer } from 'react';
import { useStore } from 'store';
import { setUsers } from 'store/actions';
import { secureFetch } from 'helpers/fetching';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import EditUser from 'components/EditUser';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'fetch':
      return {
        loading: true,
      };
    case 'success':
      return {
        loading: false,
        data: payload,
      };
    case 'failure':
      return {
        loading: false,
        error: payload,
      };
    default:
      return {};
  }
};

const useFetch = url => {
  const [state, dispatch] = useReducer(reducer, { loading: false });
  const doLoad = async () => {
    dispatch({ type: 'fetch' });
    try {
      const response = await secureFetch(url);
      setTimeout(
        () => dispatch({ type: 'success', payload: response.data }),
        1000,
      );
    } catch (e) {
      dispatch({ type: 'failure', payload: e });
    }
  };
  return { ...state, doLoad };
};

const Users = () => {
  const [state, dispatch] = useStore();
  const { data, loading, doLoad } = useFetch('/users');
  React.useEffect(() => {
    if (data) dispatch(setUsers(data));
  }, [data, dispatch, setUsers]);
  return (
    <Router>
      <Route path="/">
        <button type="button" onClick={doLoad} disabled={loading}>
          {`Refresh users${loading ? ' (loading)' : ''}`}
        </button>
        <ul>
          {state
            && state.users
            && state.users.map(user => (
              <li key={user.cognitoId}>
                {user.name} <Link to={`/users/edit/${user._id}`}>edit</Link>
              </li>
            ))}
        </ul>
      </Route>
      <Route path="/users/edit/:userId" component={EditUser} />
    </Router>
  );
};
export default Users;
