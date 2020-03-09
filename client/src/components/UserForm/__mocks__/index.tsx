import React, { FunctionComponent } from 'react';

type UserFormProps = {
  onSubmit: ({ email, roles }: { email: string; roles: string[] }) => void;
  onCancel: () => void;
};

const UserForm: FunctionComponent<UserFormProps> = ({ onSubmit, onCancel }) => (
  <form
    data-testid="form"
    onSubmit={
      (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); onSubmit({ email: 'username@domain.com', roles: ['A', 'B'] });
      }
    }
  >
    <button type="submit" data-testid="user-form-save">Save</button>
    <button onClick={onCancel} data-testid="user-form-save">Cancel</button>
  </form>
);

export default UserForm;
