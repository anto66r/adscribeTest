import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import RolesList from "./RolesList";
import RoleDetail from "./RoleDetail";
import RoleCreate from "./RoleCreate";
import { useStore } from "store";

const Roles = () => {
  let { path } = useRouteMatch();
  const [state, dispatch] = useStore();
  return (
    <>
      <h1>Roles</h1>
      <Switch>
        <Route exact path={path}>
          <RolesList roles={state.roles} />
        </Route>
        <Route exact path={`${path}/create`} component={RoleCreate} />
        <Route path={`${path}/:id`} component={RoleDetail} />
      </Switch>
    </>
  );
};
export default Roles;
