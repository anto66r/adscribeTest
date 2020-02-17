import React from 'react';
import Loading from 'components/Loading';
import { useFetch } from '../../hooks';

const Users = () => {
  const { data, loading, doFetch } = useFetch();

  const fetchUsers = () => {
    doFetch({ endpoint: '/users' });
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {
        loading ? <Loading />
          : (
            <>
              <h4>Result</h4>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </>
          )
      }
    </div>
  );
};

export default Users;
