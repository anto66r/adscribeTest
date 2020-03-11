import React from 'react';

// eslint-disable-next-line import/no-cycle
import { useFetch } from '.';
import { setUsers } from '../store/actions';
import { useStore } from '../store';


const useFetchAll = (): void => {
  const [state, dispatch] = useStore();
  const { data: dataUsers, doFetch: doFetchUsers } = useFetch();

  React.useEffect(() => {
    if (!state.users.length) {
      doFetchUsers({
        endpoint: '/users/context',
        payload: {
          id: state.user.userId,
        },
      });
    }
  }, []);
  React.useEffect(() => {
    if (dataUsers) dispatch(setUsers(dataUsers));
  }, [dataUsers, dispatch]);
};

export default useFetchAll;
