import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { IRole } from 'types';
import useToast from 'hooks/useToast';
import { useItemAdmin, useRoles } from 'hooks';

type PropsType = {
  role: IRole;
};

const Item: FunctionComponent<PropsType> = props => {
  const { role } = props;
  const { setRoles } = useRoles();
  const { url } = useRouteMatch<{ url: string }>();
  const { doSuccessToast, doErrorToast } = useToast();

  const { doDelete, loading } = useItemAdmin<IRole>({
    endpoint: '/roles',
  });
  const handleDelete = (): void => {
    doDelete({
      item: role,
      onSuccess: (collection: IRole[]): void => {
        setRoles(collection);
        doSuccessToast('Role deleted');
      },
      onError: (message: string): void => { doErrorToast(message); },
    });
  };

  return (
    <li key={role._id}>
      <Link data-testid="pl2-role-itemlink" to={`${url}/${role._id}`}>{role.name}</Link>
      {
        !role.noDelete && (
          <button disabled={loading} onClick={handleDelete} data-testid={`pl2-delete-role-${role._id}`}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        )
      }
    </li>
  );
};

export default Item;
