import React from "react";
import { useParams } from "react-router-dom";

import { useStore } from "store";
import globalPermissions from "config/permissions";

const getPermissions = (master, obj = []) =>
  master.filter(item => obj.includes(item));

const RoleDetail = () => {
  const { id } = useParams();
  const [{ roles }] = useStore();
  const { name, permissions } = roles.find(item => item._id === id) || {};
  return (
    <>
      <h2>{name}</h2>
      <h3>Permissions</h3>
      Global:<pre>{JSON.stringify(globalPermissions, 0, 4)}</pre>
      this role:<pre>{JSON.stringify(permissions, 0, 4)}</pre>
      intersection:
      <ul>
        {getPermissions(globalPermissions, permissions).map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default RoleDetail;
