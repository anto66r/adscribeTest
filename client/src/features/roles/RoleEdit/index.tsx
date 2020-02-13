import React, { FunctionComponent } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import IRole from 'types/role';
import RoleForm from 'components/RoleForm';
import { useStore } from 'store';
import useRoleAdmin from '../hooks/useRoleAdmin';

const RoleEdit: FunctionComponent = () => {
  const history = useHistory();
  const [state] = useStore();
  const { id } = useParams<{ id: string }>();
  const goBack = (): void => { history.goBack(); };
  const { handleSubmit, error } = useRoleAdmin({ action: 'UPDATE', onActionDone: goBack });

  const role = state.roles.find((item: IRole) => item._id === id);

  return (
    <RoleForm
      role={role}
      onSubmit={(r: IRole): void => { handleSubmit({ ...r, _id: id }); }}
      onCancel={goBack}
      loading={false}
      error={error}
    />
  );
};

export default RoleEdit;
