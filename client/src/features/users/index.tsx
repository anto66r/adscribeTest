import React, { FC } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import { useUsers } from 'hooks';
import UsersList from './UsersList';
import UsersDetail from './UsersDetail';
import UsersEdit from './UsersEdit';

const Roles: FC = () => {
  const { users } = useUsers();
  // console.log(users)
  const { path } = useRouteMatch();

  return (
    <>
      <h1>Users</h1>
      <Switch>
        <Route exact path={path}>
          <UsersList users={users} />
        </Route>
        <Route exact path={`${path}/create`} component={UsersEdit} />
        <Route exact path={`${path}/edit/:id`} component={UsersEdit} />
        <Route path={`${path}/:id`} component={UsersDetail} />
      </Switch>
    </>
  );
};
export default Roles;
