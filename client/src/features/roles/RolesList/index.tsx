import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import IRole from 'types/role';

type ContentProps = {
  roles: IRole[];
};

const RolesList: FunctionComponent<ContentProps> = ({ roles }) => {
  const { url } = useRouteMatch<{ url: string }>();

  return (
    <>
      <ul>
        {roles
          && roles.map((role: IRole) => (
            <li key={role._id}>
              <Link to={`${url}/${role._id}`}>{role.name}</Link>
            </li>
          ))}
      </ul>
      <Link to={`${url}/create`}>Create new</Link>
    </>
  );
};

export default RolesList;
