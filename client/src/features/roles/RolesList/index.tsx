import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import IRole from 'types/role';
import useToast from 'hooks/useToast';
import useRoleAdmin from '../hooks/useRoleAdmin';

type ContentProps = {
  roles: IRole[];
};

const RolesList: FunctionComponent<ContentProps> = ({ roles }) => {
  const { url } = useRouteMatch<{ url: string }>();
  const { doSuccessToast, doErrorToast } = useToast();

  const { handleSubmit } = useRoleAdmin({
    action: 'DELETE',
    onSuccess: (): void => { doSuccessToast('Role deleted'); },
    onError: (message: string): void => { doErrorToast(message); },
  });

  const handleDelete = (name: string): void => {
    handleSubmit({ name });
  };


  return (
    <>
      <ul>
        {roles
          && roles.map((role: IRole) => (
            <li key={role._id}>
              <Link to={`${url}/${role._id}`}>{role.name}</Link>
              {!role.noDelete && <button onClick={(): void => handleDelete(role.name)}>Delete</button>}
            </li>
          ))}
      </ul>
      <Link to={`${url}/create`}>Create new</Link>
    </>
  );
};

export default RolesList;
