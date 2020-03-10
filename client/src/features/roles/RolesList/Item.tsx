import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { IRole } from 'types';
import useToast from 'hooks/useToast';
import { useItemAdmin, useRoles } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import Permission from 'types/permission';

type PropsType = {
  role: IRole;
};

const Item: FunctionComponent<PropsType> = props => {
  const { role } = props;
  const { setRoles } = useRoles();
  const { url } = useRouteMatch<{ url: string }>();
  const { checkPermissions } = usePermissions();
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
      {
        checkPermissions(Permission.ROLES__DETAIL)
          ? <Link data-testid="pl2-role-itemlink" to={`${url}/${role._id}`}>{role.name}</Link>
          : role.name
      }
      {
        checkPermissions(Permission.ROLES__DELETE) && !role.noDelete && (
          <button disabled={loading} onClick={handleDelete} data-testid="role-itemDelete">
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        )
      }
    </li>
  );
};

export default Item;
