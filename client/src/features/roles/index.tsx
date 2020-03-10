import React, { FunctionComponent } from 'react';
import {
  Route, useRouteMatch, Switch, Redirect,
} from 'react-router-dom';

import { useRoles } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import Permission from 'types/permission';
import RolesList from './RolesList';
import RolesDetail from './RolesDetail';
import RolesEdit from './RolesEdit';

const Roles: FunctionComponent = () => {
  const { roles } = useRoles();
  const { path } = useRouteMatch();
  const { checkPermissions } = usePermissions();

  return (
    <>
      <h1>Roles</h1>
      <Switch>
        {
          checkPermissions(Permission.ROLES__VIEW)
          && (
          <Route exact path={path}>
            <RolesList roles={roles} />
          </Route>
          )
        }
        {
          checkPermissions(Permission.ROLES__CREATE)
          && <Route exact path={`${path}/create`} component={RolesEdit} />
        }
        {
          checkPermissions(Permission.ROLES__UPDATE)
          && <Route exact path={`${path}/edit/:id`} component={RolesEdit} />
        }
        {
          checkPermissions(Permission.ROLES__DETAIL)
          && <Route path={`${path}/:id`} component={RolesDetail} />
        }
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};
export default Roles;
