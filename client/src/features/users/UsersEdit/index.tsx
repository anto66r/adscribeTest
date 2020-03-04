import React, { FunctionComponent, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import UserForm from 'components/UserForm';
import useToast from 'hooks/useToast';
import { useItemAdmin, useUsers } from 'hooks';
import { IUser } from '../../../types';

const UserEdit: FunctionComponent = () => {
  const history = useHistory();
  const { users = [], setUsers } = useUsers();
  const { id } = useParams<{ id: string }>();
  const { doSuccessToast, doErrorToast } = useToast();
  const goToUsers = (): void => {
    history.push('/users');
  };
  const [error, setError] = useState('');

  const handleSuccess = (collection: IUser[]): void => {
    setUsers(collection);
    doSuccessToast(id ? 'User updated' : 'User created');
    history.push('/users');
  };
  const handleError = (message: string): void => { doErrorToast(message); };

  const { doUpdate, doCreate, loading } = useItemAdmin<IUser>({
    endpoint: '/users',
  });

  const user = users.find((item: IUser) => item._id === id);

  const handleSubmit = async (updateUser: IUser): Promise<void> => {
    setError('');

    if (id) {
      doUpdate({
        item: updateUser,
        onSuccess: handleSuccess,
        onError: handleError,
      });
    } else {
      try {
        doCreate({
          item: {
            ...updateUser,
          },
          onSuccess: handleSuccess,
          onError: handleError,
        });
      } catch (err) {
        setError(`${err.message}: ${err.code}`);
      }
    }
  };
  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <UserForm
        user={user}
        onSubmit={handleSubmit}
        onCancel={goToUsers}
        loading={loading}
      />
    </>
  );
};

export default UserEdit;
