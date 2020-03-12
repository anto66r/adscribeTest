import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import usePermissions from 'hooks/usePermissions';
import Permission from 'types/permission';
import { IUser } from 'types';
import Item from './Item';

type ContentProps = {
  users: IUser[];
};

const UsersList: FunctionComponent<ContentProps> = ({ users }) => {
  const { url } = useRouteMatch<{ url: string }>();
  const { checkPermissions } = usePermissions();

  return (
    <>
      <ul>
        {users
          && users.map((user: IUser) => <Item key={user.id} user={user} />)}
      </ul>
      {checkPermissions(Permission.USERS__CREATE) && <Link to={`${url}/create`}>Create new</Link>}
    </>
  );
};

export default UsersList;
