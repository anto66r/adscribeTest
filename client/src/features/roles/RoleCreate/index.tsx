import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

import RoleForm from 'components/RoleForm';
import useToast from 'hooks/useToast';
import useRoleAdmin from '../hooks/useRoleAdmin';

const RoleCreate: FunctionComponent = () => {
  const history = useHistory();
  const goBack = (): void => { history.goBack(); };
  const { doSuccessToast, doErrorToast } = useToast();

  const handleSuccess = (): void => { doSuccessToast('Role created'); history.goBack(); };
  const handleError = (message: string): void => { doErrorToast(message); };

  const { handleSubmit, loading } = useRoleAdmin({ action: 'CREATE', onSuccess: handleSuccess, onError: handleError });

  return (
    <RoleForm
      onSubmit={handleSubmit}
      onCancel={goBack}
      loading={loading}
    />
  );
};

export default RoleCreate;
