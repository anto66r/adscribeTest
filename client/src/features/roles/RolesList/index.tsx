import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import IRole from 'types/role';
import { useRoles } from 'hooks';
import Item from './Item';

const RolesList: FunctionComponent = () => {
  const { url } = useRouteMatch<{ url: string }>();
  const { roles } = useRoles();

  return (
    <>
      <ul>
        {roles
          && roles.map((role: IRole) => <Item key={role.name} role={role} />)}
      </ul>
      <Link to={`${url}/create`}>Create new</Link>
    </>
  );
};

export default RolesList;
