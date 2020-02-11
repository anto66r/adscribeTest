/* eslint-disable  */
import React, { FunctionComponent, useContext } from 'react';
import './styles.scss';
import { UserContext } from '../../context/UserContext';

type FooterProps = {
  label: string;
};

const Footer: FunctionComponent<FooterProps> = ({ label }) => {
  const { remember, user, cognito } = useContext(UserContext);

  return (
    <div className="footer">
      The Footer label: {label}
      <div className="rightSide">
        <li>
          remember: {JSON.stringify(remember)}
        </li>
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
