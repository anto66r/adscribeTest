import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import './styles.scss';

const Sidebar: FunctionComponent = () => {
  const [expanded, setExpanded] = React.useState(false);
  function handleMouseEnter(): void {
    setExpanded(true);
  }
  function handleMouseLeave(): void {
    setExpanded(false);
  }
  return (
    <nav
      className={classnames('sidebar', { expanded })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <li>
        <NavLink to="/users">Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboards">Dashboards</NavLink>
      </li>
    </nav>
  );
};

export default Sidebar;
