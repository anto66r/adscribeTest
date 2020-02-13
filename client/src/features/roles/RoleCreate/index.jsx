import React from 'react';
import { useHistory } from 'react-router-dom';

import RoleForm from 'components/RoleForm';

const RoleCreate = () => {
  const history = useHistory();

  const handleCancel = () => history.goBack();

  return (
    <RoleForm
      permissions={[]}
      name=""
      onSubmit={console.log}
      onCancel={handleCancel}
    />
  );
};

export default RoleCreate;
