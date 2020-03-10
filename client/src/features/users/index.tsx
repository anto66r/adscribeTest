import React, { FunctionComponent } from 'react';
import {
  Route, useRouteMatch, Switch, Redirect,
} from 'react-router-dom';

import { useUsers } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import Permission from 'types/permission';
import UsersList from './UsersList';
import UsersDetail from './UsersDetail';
import UsersEdit from './UsersEdit';

const Users: FunctionComponent = () => {
  const { users } = useUsers();
  const { path } = useRouteMatch();
  const { checkPermissions } = usePermissions();

  return (
    <>
      <h1>Users</h1>
      <Switch>
        {
          checkPermissions(Permission.USERS__VIEW)
          && (
            <Route exact path={path}>
              <UsersList users={users} />
            </Route>
          )
        }
        {
          checkPermissions(Permission.USERS__CREATE)
          && <Route exact path={`${path}/create`} component={UsersEdit} />
        }
        {
          checkPermissions(Permission.USERS__UPDATE)
          && <Route exact path={`${path}/edit/:id`} component={UsersEdit} />
        }
        {
          checkPermissions(Permission.USERS__DETAIL)
          && <Route path={`${path}/:id`} component={UsersDetail} />
        }
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};
export default Users;
