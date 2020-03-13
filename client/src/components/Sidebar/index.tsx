import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import usePermissions from 'hooks/usePermissions';
import './styles.scss';
import Permission from 'types/permission';

const Sidebar: FunctionComponent = () => {
  const [expanded, setExpanded] = React.useState(false);
  const { checkPermissions } = usePermissions();

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
      data-testid="sidebar"
    >
      {
        checkPermissions(Permission.USERS__VIEW) && (
          <li>
            <NavLink to="/users">
              <i className="fa fa-user" />
              {expanded && 'Users'}
            </NavLink>
          </li>
        )
      }
      {
        checkPermissions(Permission.REPORTS__VIEW) && (
          <li>
            <NavLink to="/reports">
              <i className="fa fa-tachometer-alt" />
              {expanded && 'Reports'}
            </NavLink>
          </li>
        )
      }
      {
        checkPermissions(Permission.ROLES__VIEW) && (
          <li>
            <NavLink to="/roles">
              <i className="fa fa-lock" />
              {expanded && 'Roles'}
            </NavLink>
          </li>
        )
      }
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
