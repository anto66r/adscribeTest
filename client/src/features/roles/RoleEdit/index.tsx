import React, { FunctionComponent } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { IRole, FetchAction } from 'types';
import RoleForm from 'components/RoleForm';
import { useStore } from 'store';
import useToast from 'hooks/useToast';
import useRoleAdmin from '../hooks/useRoleAdmin';

const RoleEdit: FunctionComponent = () => {
  const history = useHistory();
  const [state] = useStore();
  const { id } = useParams<{ id: string }>();
  const { doSuccessToast, doErrorToast } = useToast();
  const goBack = (): void => { history.goBack(); };

  const handleSuccess = (): void => { doSuccessToast(id ? 'Role updated' : 'Role created'); history.goBack(); };
  const handleError = (message: string): void => { doErrorToast(message); };

  const { handleSubmit, loading } = useRoleAdmin({ action: id ? FetchAction.UPDATE : FetchAction.CREATE, onSuccess: handleSuccess, onError: handleError });

  const role = state.roles.find((item: IRole) => item._id === id);

  return (
    <RoleForm
      role={role}
      onSubmit={(r: IRole): void => { handleSubmit({ ...r, _id: id }); }}
      onCancel={goBack}
      loading={loading}
    />
  );
};

export default RoleEdit;
