import React, { FunctionComponent } from 'react';
import IRole from 'types/role';

type ContentProps = {
  onSubmit: (role: IRole) => void;
  onCancel: () => void;
};

const RoleForm: FunctionComponent<ContentProps> = ({ onSubmit, onCancel }) => (
  <form
    data-testid="form"
    onSubmit={
    (): void => onSubmit({ name: 'Name', permissions: ['A', 'B'] })
  }
  >
    <button type="submit" data-testid="Save">Save</button>
    <button onClick={onCancel} data-testid="Cancel">Cancel</button>
  </form>
);

export default RoleForm;
