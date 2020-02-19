import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { IUser } from 'types';
import Item from './Item';

type ContentProps = {
  users: IUser[];
};

const UsersList: FunctionComponent<ContentProps> = ({ users }) => {
  const { url } = useRouteMatch<{ url: string }>();

  return (
    <>
      <ul>
        {users
          && users.map((user: IUser) => <Item key={user._id} user={user} />)}
      </ul>
      <Link to={`${url}/create`}>Create new</Link>
    </>
  );
};

export default UsersList;
