import React, { useState, FunctionComponent } from 'react';
import globalPermissions from 'config/permissions';

import IRole from 'types/role';

type ContentProps = {
  role?: IRole;
  loading?: boolean;
  onSubmit: (role: IRole) => void;
  onCancel: () => void;
};

const RoleForm: FunctionComponent<ContentProps> = ({
  role = { permissions: [], name: '' }, onSubmit, onCancel, loading,
}) => {
  const { name, permissions = [] } = role;
  const [formName, setFormName] = useState(name);
  const [checkedItems, setCheckedItems] = useState(() => permissions.reduce((acc: any, cur: string) => {
    acc[cur] = true;
    return acc;
  }, {}));

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCheckedItems({ ...checkedItems, [e.target.name]: e.target.checked });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => setFormName(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit({
      name: formName,
      permissions: Object.keys(checkedItems).filter(item => checkedItems[item]),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleNameChange}
        value={formName}
      />
      <ul>
        {globalPermissions.sort().map(item => (
          <li key={item}>
            <input
              data-testid={item}
              type="checkbox"
              name={item}
              checked={checkedItems[item] || false}
              onChange={handleCheckChange}
            />
            {item}
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

export default RoleForm;
