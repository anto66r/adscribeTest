import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import IRole from 'types/role';
import Item from './Item';

type ContentProps = {
  roles: IRole[];
};

const RolesList: FunctionComponent<ContentProps> = ({ roles }) => {
  const { url } = useRouteMatch<{ url: string }>();

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
