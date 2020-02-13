import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useStore } from "store";
import globalPermissions from "config/permissions";

const RoleCreate = () => {
  const [name, setName] = useState("");
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckChange = e => {
    const { target, name, checked } = e.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
    console.log(checkedItems);
  };

  const handleNameChange = e => setName(e.target.value);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const { target } = e;
        console.log(e);
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleNameChange}
        value={name}
      />
      <ul>
        {globalPermissions.sort().map(item => (
          <li key={item}>
            <input
              type="checkbox"
              name={item}
              selected={checkedItems[item]}
              onChange={handleCheckChange}
            />
            {item}
          </li>
        ))}
      </ul>
      <button type="submit">Save</button>
      <button type="button" onClick={console.log}>
        Cancel
      </button>
    </form>
  );
};

export default RoleCreate;
