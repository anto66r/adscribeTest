import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

import "./styles.scss";

const Sidebar: FunctionComponent = () => (
  <nav>
    <li>
      <NavLink to="/users">Users</NavLink>
    </li>
    <li>
      <NavLink to="/dashboards">Dashboards</NavLink>
    </li>
  </nav>
);

export default Sidebar;
