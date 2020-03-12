import React, { FunctionComponent } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getPermissions } from 'helpers/roles';
import { useRoles } from 'hooks';
import IRole from 'types/role';
import Permission from 'types/permission';
import usePermissions from 'hooks/usePermissions';

const RoleDetail: FunctionComponent = () => {
  const { id } = useParams();
  const { roles } = useRoles();
  const { checkPermissions } = usePermissions();

  const { name, permissions } = roles.find((item: IRole) => item?.id === id) || {};

  return (
    <>
      <h2>{name}</h2>
      <ul>
        {getPermissions(permissions).map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {checkPermissions(Permission.ROLES__UPDATE) && <Link to={`edit/${id}`} data-testid="pl2-role-edit">Edit role</Link>}
    </>
  );
};

export default RoleDetail;
