import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import IRole from 'types/role';
import Permission from 'types/permission';
import usePermissions from 'hooks/usePermissions';
import Item from './Item';

type ContentProps = {
  roles: IRole[];
};

const RolesList: FunctionComponent<ContentProps> = ({ roles }) => {
  const { url } = useRouteMatch<{ url: string }>();
  const { checkPermissions } = usePermissions();

  return (
    <>
      <ul>
        {roles
          && roles.map((role: IRole) => <Item key={role.name} role={role} />)}
      </ul>
      {checkPermissions(Permission.ROLES__CREATE) && <Link to={`${url}/create`}>Create new</Link>}
    </>
  );
};

export default RolesList;
