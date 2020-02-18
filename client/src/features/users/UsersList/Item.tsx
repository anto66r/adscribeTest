import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { IUser } from 'types';
import { useToast, useItemAdmin } from 'hooks';
import { useStore } from 'store';
import { setUsers } from 'store/actions';

type PropsType = {
  user: IUser;
};

const Item: FunctionComponent<PropsType> = props => {
  const { user } = props;
  const [, dispatch] = useStore();
  const { url } = useRouteMatch<{ url: string }>();
  const { doSuccessToast, doErrorToast } = useToast();
  const { doDelete, loading } = useItemAdmin<IUser>({
    endpoint: '/users',
  });

  const handleDelete = (): void => {
    doDelete({
      item: user,
      onSuccess: (collection: IUser[]): void => {
        dispatch(setUsers(collection));
        doSuccessToast('User deleted');
      },
      onError: (message: string): void => { doErrorToast(message); },
    });
  };
  return (
    <li key={user._id}>
      <Link data-testid="pl2-role-itemlink" to={`${url}/${user._id}`}>{user.username}</Link>

      <button disabled={loading} onClick={handleDelete}>
        {loading ? 'Deleting...' : 'Delete'}
      </button>

    </li>
  );
};

export default Item;
