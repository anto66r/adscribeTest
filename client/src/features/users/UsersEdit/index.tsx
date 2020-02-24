import React, { FunctionComponent } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { IUser } from 'types';
import UserForm from 'components/UserForm';
import useToast from 'hooks/useToast';
import { useItemAdmin, useUsers } from 'hooks';

const UserEdit: FunctionComponent = () => {
  const history = useHistory();
  const { users = [], setUsers } = useUsers();
  const { id } = useParams<{ id: string }>();
  const { doSuccessToast, doErrorToast } = useToast();
  const goBack = (): void => { history.goBack(); };

  const handleSuccess = (collection: IUser[]): void => {
    setUsers(collection);
    doSuccessToast(id ? 'User updated' : 'User created'); history.goBack();
  };
  const handleError = (message: string): void => { doErrorToast(message); };

  const { doUpdate, doCreate, loading } = useItemAdmin<IUser>({
    endpoint: '/users',
  });

  const user = users.find((item: IUser) => item._id === id);

  const handleSubmit = ({ username, roles }: { username: string; roles: string[] }): void => {
    const item = { username, roles, _id: id };
    if (id) {
      doUpdate({
        item,
        onSuccess: handleSuccess,
        onError: handleError,
      });
    } else {
      doCreate({
        item,
        onSuccess: handleSuccess,
        onError: handleError,
      });
    }
  };
  return (
    <UserForm
      user={user}
      onSubmit={handleSubmit}
      onCancel={goBack}
      loading={loading}
    />
  );
};

export default UserEdit;
