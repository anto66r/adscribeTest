import React, { FC } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import { useStore } from 'store';
import RolesList from './RolesList';
import RolesDetail from './RolesDetail';
import RolesEdit from './RolesEdit';

const Roles: FC = () => {
  const [{ roles }] = useStore();

  const { path } = useRouteMatch();

  return (
    <>
      <h1>Roles</h1>
      <Switch>
        <Route exact path={path}>
          <RolesList roles={roles} />
        </Route>
        <Route exact path={`${path}/create`} component={RolesEdit} />
        <Route exact path={`${path}/edit/:id`} component={RolesEdit} />
        <Route path={`${path}/:id`} component={RolesDetail} />
      </Switch>
    </>
  );
};
export default Roles;
