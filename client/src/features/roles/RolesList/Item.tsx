import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import IRole from 'types/role';
import useToast from 'hooks/useToast';
import useRoleAdmin from '../hooks/useRoleAdmin';

type PropsType = {
  role: IRole;
};

const Item: FunctionComponent<PropsType> = props => {
  const { role } = props;
  const { url } = useRouteMatch<{ url: string }>();
  const { doSuccessToast, doErrorToast } = useToast();
  const { handleSubmit, loading } = useRoleAdmin({
    action: 'DELETE',
    onSuccess: (): void => { doSuccessToast('Role deleted'); },
    onError: (message: string): void => { doErrorToast(message); },
  });

  const handleDelete = (name: string): void => {
    handleSubmit({ name });
  };
  return (
    <li key={role._id}>
      <Link data-testid="pl2-role-itemlink" to={`${url}/${role._id}`}>{role.name}</Link>
      {
        !role.noDelete && (
          <button disabled={loading} onClick={(): void => handleDelete(role.name)}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        )
      }
    </li>
  );
};

export default Item;
