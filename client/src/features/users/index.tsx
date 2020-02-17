import React from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import { useStore } from 'store';
// import IRole from 'types/role';
// import UsersList from './UsersList';
// import UsersDetail from './UsersDetail';
// import UsersEdit from './UsersEdit';

const Roles = () => {
  const [state] = useStore();
  const { path } = useRouteMatch();

  return (
    <>
      <h1>Users</h1>
      <Switch>
        <Route exact path={path}>
          {/* <UsersList roles={state.roles} /> */}
        </Route>
        {/* <Route exact path={`${path}/create`} component={RoleEdit} /> */}
        {/* <Route exact path={`${path}/edit/:id`} component={UsersEdit} />
        <Route path={`${path}/:id`} component={UsersDetail} /> */}
      </Switch>
    </>
  );
};
export default Roles;
