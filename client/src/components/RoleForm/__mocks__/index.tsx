import React, { FunctionComponent } from 'react';

type RoleFormProps = {
  onSubmit: ({ name, permissions }: { name: string; permissions: string[] }) => void;
  onCancel: () => void;
};

const RoleForm: FunctionComponent<RoleFormProps> = ({ onSubmit, onCancel }) => (
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
