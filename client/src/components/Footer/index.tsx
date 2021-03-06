/* eslint-disable  */
import React, {FunctionComponent, useContext} from 'react';
import {UserContext} from '../../context/UserContext';
import './styles.scss';

type FooterProps = {
  label: string;
};

const Footer: FunctionComponent<FooterProps> = ({ label }) => {
  const { user, cognito } = useContext(UserContext);

  return (
    <div className="footer">
      The Footer label: {label}
      <div className="rightSide">
        <li>
          user: {JSON.stringify(user)}
        </li>
        <li>
          cognitoAuth: {JSON.stringify(cognito)}
        </li>
      </div>

    </div>
  );
};

export default Footer;
