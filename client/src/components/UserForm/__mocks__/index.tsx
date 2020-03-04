import React, { FunctionComponent } from 'react';

type UserFormProps = {
  onSubmit: ({ email, roles }: { email: string; roles: string[] }) => void;
  onCancel: () => void;
};

const UserForm: FunctionComponent<UserFormProps> = ({ onSubmit, onCancel }) => (
  <form
    data-testid="form"
    onSubmit={
    (): void => onSubmit({ email: 'username@domain.com', roles: ['A', 'B'] })
  }
  >
    <button type="submit" data-testid="Save">Save</button>
    <button onClick={onCancel} data-testid="Cancel">Cancel</button>
  </form>
);

export default UserForm;
