import React from 'react';
import { useHistory } from 'react-router-dom';

import IRole from 'types/role';
import RoleForm from 'components/RoleForm';

type SubmitProps = {
  name: string;
  permissions: string[];
}
const RoleCreate = () => {
  const history = useHistory();

  const handleCancel = (): void => history.goBack();

  const handleSubmit = (role: IRole): void => console.log(role);

  return (
    <RoleForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default RoleCreate;
