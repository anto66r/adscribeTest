import React, { FunctionComponent } from "react";
import "./styles.scss";

type FooterProps = {
  label: string;
};

const Footer: FunctionComponent<FooterProps> = ({ label }) => (
  <p className="footer">The Footer label: {label} </p>
);

export default Footer;
