import React, { FunctionComponent } from 'react';

type UserFormProps = {
  onSubmit: ({ username, roles }: { username: string; roles: string[] }) => void;
  onCancel: () => void;
};

const UserForm: FunctionComponent<UserFormProps> = ({ onSubmit, onCancel }) => (
  <form
    data-testid="form"
    onSubmit={
    (): void => onSubmit({ username: 'User Name', roles: ['A', 'B'] })
  }
  >
    <button type="submit" data-testid="Save">Save</button>
    <button onClick={onCancel} data-testid="Cancel">Cancel</button>
  </form>
);

export default UserForm;
