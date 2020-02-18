import React, { FunctionComponent } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getPermissions } from 'helpers/roles';
import { useStore } from 'store';
import IRole from 'types/role';

const RoleDetail: FunctionComponent = () => {
  const { id } = useParams();
  const [{ roles }] = useStore();

  const { name, permissions } = roles.find((item: IRole) => item._id === id) || {};

  return (
    <>
      <h2>{name}</h2>
      <ul>
        {getPermissions(permissions).map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link to={`edit/${id}`} data-testid="pl2-role-edit">Edit role</Link>
    </>
  );
};

export default RoleDetail;
