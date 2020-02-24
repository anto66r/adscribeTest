import React, { FunctionComponent } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useUsers, useRoles } from 'hooks';
import { IUser, IRole } from 'types';
import { getRoles } from 'helpers/roles';

const UsersDetail: FunctionComponent = () => {
  const { id } = useParams();
  const { users } = useUsers();
  const { roles: allRoles } = useRoles();
  const { username, roles = [] } = users.find((item: IUser) => item._id === id) || {};

  return (
    <>
      <h2>{username}</h2>
      <ul>
        {getRoles(roles, allRoles).map((item: IRole) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
      <Link to={`edit/${id}`} data-testid="pl2-role-edit">Edit user</Link>
    </>
  );
};

export default UsersDetail;
