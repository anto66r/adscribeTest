import React from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import { useStore } from 'store';
import { useFetch } from 'hooks';
import { setRoles } from 'store/actions';
import RolesList from './RolesList';
import RoleDetail from './RoleDetail';
import RoleEdit from './RoleEdit';
import RoleCreate from './RoleCreate';

const Roles = () => {
  const [state, dispatch] = useStore();
  const { data, doLoad } = useFetch('/roles');
  React.useEffect(() => {
    doLoad();
  }, []);
  React.useEffect(() => {
    if (data) dispatch(setRoles(data));
  }, [data, dispatch]);

  const { path } = useRouteMatch();

  return (
    <>
      <h1>Roles</h1>
      <Switch>
        <Route exact path={path}>
          <RolesList roles={state.roles} />
        </Route>
        <Route exact path={`${path}/create`} component={RoleCreate} />
        <Route exact path={`${path}/edit/:id`} component={RoleEdit} />
        <Route path={`${path}/:id`} component={RoleDetail} />
      </Switch>
    </>
  );
};
export default Roles;