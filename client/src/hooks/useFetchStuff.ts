import React from 'react';

// eslint-disable-next-line import/no-cycle
import { useFetch } from '.';
import { setUsers, setRoles } from '../store/actions';
import { useStore } from '../store';


const useFetchStuff = (): void => {
  const [state, dispatch] = useStore();
  const { data: dataUsers, doFetch: doFetchUsers } = useFetch();
  const { data: dataRoles, doFetch: doFetchRoles } = useFetch();

  React.useEffect(() => {
    if (!state.users.length) doFetchUsers({ endpoint: '/users' });
    if (!state.roles.length) doFetchRoles({ endpoint: '/roles' });
  }, []);
  React.useEffect(() => {
    if (dataUsers) dispatch(setUsers(dataUsers));
  }, [dataUsers, dispatch]);

  React.useEffect(() => {
    if (dataRoles) dispatch(setRoles(dataRoles));
  }, [dataRoles, dispatch]);
};

export default useFetchStuff;
