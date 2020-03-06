import React, { FunctionComponent } from 'react';

type RoleFormProps = {
  onSubmit: ({ name, permissions }: { name: string; permissions: string[] }) => void;
  onCancel: () => void;
};

const RoleForm: FunctionComponent<RoleFormProps> = ({ onSubmit, onCancel }) => (
  <form
    data-testid="form"
    onSubmit={
      (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); onSubmit({ name: 'Name', permissions: ['A', 'B'] });
      }
    }
  >
    <button type="submit" data-testid="role-form-save">Save</button>
    <button onClick={onCancel} data-testid="role-form-cancel">Cancel</button>
  </form>
);

export default RoleForm;
