import React from 'react';
import { Link } from 'react-router-dom';

import { useStore } from 'store';
import { setUsers } from 'store/actions';
import useFetch from 'hooks/useFetch';

const NewUser = () => {
  const [state, dispatch] = useStore();
  const { data, loading, doLoad } = useFetch('/users');
  React.useEffect(() => {
    if (data) dispatch(setUsers(data));
  }, [data, dispatch]);
  return (
    <>
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
    </>
  );
};
export default NewUser;
