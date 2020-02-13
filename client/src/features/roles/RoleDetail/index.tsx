import React, { FunctionComponent } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useStore } from 'store';
import globalPermissions from 'config/permissions';
import IRole from 'types/role';

const getPermissions = (master: string[], obj: string[] = []): string[] => master.filter((item: string) => obj.includes(item));

const RoleDetail: FunctionComponent = () => {
  const { id } = useParams();
  // const { path, url } = useRouteMatch();
  const [{ roles }] = useStore();
  const { name, permissions } = roles.find((item: IRole) => item._id === id) || {};

  return (
    <>
      <h2>{name}</h2>
      <ul>
        {getPermissions(globalPermissions, permissions).map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link to={`edit/${id}`}>Edit role</Link>
    </>
  );
};

export default RoleDetail;
