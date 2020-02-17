import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
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
        <NavLink to="/users">
          <i className="fa fa-user" />
          {expanded && 'Users'}
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboards">
          <i className="fa fa-tachometer-alt" />
          {expanded && 'Dashboards'}
        </NavLink>
      </li>
      <li>
        <NavLink to="/roles">
          <i className="fa fa-lock" />
          {expanded && 'Roles'}
        </NavLink>
      </li>
      <li>
        <NavLink to="/testapi">
          <i className="fa fa-cog" />
          {expanded && 'Test API'}
        </NavLink>
      </li>
    </nav>
  );
};

export default Sidebar;
