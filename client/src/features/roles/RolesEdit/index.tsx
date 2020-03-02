import React, { FunctionComponent } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { IRole } from 'types';
import RoleForm from 'components/RoleForm';
import useToast from 'hooks/useToast';
import { useItemAdmin, useRoles } from 'hooks';

const RoleEdit: FunctionComponent = () => {
  const history = useHistory();
  const { roles, setRoles } = useRoles();
  const { id } = useParams<{ id: string }>();
  const { doSuccessToast, doErrorToast } = useToast();
  const goToRoles = (): void => { history.push('/roles'); };

  const handleSuccess = (collection: IRole[]): void => {
    setRoles(collection);
    doSuccessToast(id ? 'Role updated' : 'Role created');
    history.push('/roles');
  };
  const handleError = (message: string): void => { doErrorToast(message); };

  const { doUpdate, doCreate, loading } = useItemAdmin<IRole>({
    endpoint: '/roles',
  });

  const role = roles.find((item: IRole) => item._id === id);
  const handleSubmit = ({ name, permissions }: { name: string; permissions: string[] }): void => {
    const item = { name, permissions, _id: id };
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
    <RoleForm
      role={role}
      onSubmit={handleSubmit}
      onCancel={goToRoles}
      loading={loading}
    />
  );
};

export default RoleEdit;
