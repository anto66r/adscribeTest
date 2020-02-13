import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import RoleForm from 'components/RoleForm';
import useRoleAdmin from '../hooks/useRoleAdmin';

const RoleCreate: FunctionComponent = () => {
  const history = useHistory();
  const goBack = (): void => { history.goBack(); };
  const { handleSubmit, error } = useRoleAdmin({ action: 'CREATE', onActionDone: goBack });

  return (
    <RoleForm
      onSubmit={handleSubmit}
      onCancel={goBack}
      error={error}
    />
  );
};

export default RoleCreate;
