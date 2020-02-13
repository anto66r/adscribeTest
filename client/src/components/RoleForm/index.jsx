import React, { useState } from 'react';
import globalPermissions from 'config/permissions';

const RoleEdit = ({
  name = '', permissions = [], onSubmit, onCancel,
}) => {
  const [formName, setFormName] = useState(name);
  const [checkedItems, setCheckedItems] = useState(() => permissions.reduce((acc, cur) => {
    acc[cur] = true;
    return acc;
  }, {}));

  const handleCheckChange = e => {
    const { name: permission, checked } = e.target;
    setCheckedItems({ ...checkedItems, [permission]: checked });
  };

  const handleNameChange = e => setFormName(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      name,
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
              type="checkbox"
              name={item}
              checked={checkedItems[item] || false}
              onChange={handleCheckChange}
            />
            {item}
          </li>
        ))}
      </ul>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default RoleEdit;
