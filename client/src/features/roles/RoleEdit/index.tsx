import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import RoleForm from 'components/RoleForm';
import IRole from 'types/role';

import { useStore } from 'store';

const RoleEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [state] = useStore();
  const history = useHistory();

  const handleCancel = () => history.goBack();

  const role = state.roles.find((item: IRole) => item._id === id);
  return (
    <RoleForm
      permissions={role.permissions}
      name={role.name}
      onSubmit={console.log}
      onCancel={handleCancel}
    />
  );
};

export default RoleEdit;
