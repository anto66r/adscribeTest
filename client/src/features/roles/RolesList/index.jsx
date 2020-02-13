import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const RolesList = ({ roles }) => {
  let { url } = useRouteMatch();
  return (
    <>
      <ul>
        {roles &&
          roles.map(({ name, _id }) => (
            <li key={_id}>
              <Link to={`${url}/${_id}`}>{name}</Link>
            </li>
          ))}
      </ul>
      <Link to={`${url}/create`}>Create new</Link>
    </>
  );
};

export default RolesList;
