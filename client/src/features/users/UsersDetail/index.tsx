import React, { FunctionComponent } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useUsers, useRoles } from 'hooks';
import { IUser, IRole } from 'types';
import { getRoles } from 'helpers/roles';
import usePermissions from 'hooks/usePermissions';
import Permission from 'types/permission';

const UsersDetail: FunctionComponent = () => {
  const { id } = useParams();
  const { users } = useUsers();
  const { roles: allRoles } = useRoles();
  const { name, roles = [] } = users.find((item: IUser) => item?.id === id) || {};
  const { checkPermissions } = usePermissions();

  return (
    <>
      <h2>{name}</h2>
      <ul>
        {getRoles(roles, allRoles).map((item: IRole) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {checkPermissions(Permission.USERS__UPDATE) && <Link to={`edit/${id}`} data-testid="pl2-user-edit">Edit user</Link>}
    </>
  );
};

export default UsersDetail;
