import React, { FunctionComponent, useContext } from 'react';
import './styles.scss';
import { UserContext } from '../../context/UserContext';
import { isLogged } from '../../helpers/cognito';

const Header: FunctionComponent = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Platf0rm-2</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <span className="sr-only">(current)</span>
          </li>
        </ul>


        {
          isLogged() ? (
            <>
              <h6 className="mr-3">
                {user.username}
              </h6>
              <a href="/logout" className="btn btn-outline-success my-2 my-sm-0">Logout</a>
            </>
          ) : (
            <a href="/login" className="btn btn-outline-success my-2 my-sm-0">Login</a>
          )
        }
      </div>
    </nav>
  );
};

export default Header;
