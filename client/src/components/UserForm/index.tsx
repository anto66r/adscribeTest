import React, { useState, FunctionComponent } from 'react';

import { IUser, IRole } from 'types';
import { useRoles } from 'hooks';

type ContentProps = {
  user?: IUser;
  loading?: boolean;
  onSubmit: ({ username, roles }: { username: string; roles: string[] }) => void;
  onCancel: () => void;
};

const UserForm: FunctionComponent<ContentProps> = ({
  user = { roles: [], username: '' }, onSubmit, onCancel, loading,
}) => {
  const { roles: allRoles } = useRoles();
  const { username, roles = [] } = user;
  const [formName, setFormName] = useState(username);
  const [checkedItems, setCheckedItems] = useState(() => roles.reduce((acc: any, cur: string) => {
    acc[cur] = true;
    return acc;
  }, {}));

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCheckedItems({ ...checkedItems, [e.target.value]: e.target.checked });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => setFormName(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit({
      username: formName,
      roles: Object.keys(checkedItems).filter(item => checkedItems[item]),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">User Name</label>
      <input
        type="text"
        id="username"
        name="username"
        onChange={handleNameChange}
        value={formName}
      />
      <ul>
        {allRoles.sort().map((item: IRole) => (
          <li key={item.name}>
            <input
              data-testid={item}
              type="checkbox"
              name={item.name}
              value={item._id}
              checked={checkedItems[item._id] || false}
              onChange={handleCheckChange}
            />
            {item.name}
          </li>
        ))}
      </ul>
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
