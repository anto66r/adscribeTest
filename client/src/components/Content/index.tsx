import React, { FunctionComponent } from "react";

type ContentProps = {
  children: React.ReactNode;
};

const Content: FunctionComponent<ContentProps> = ({ children }) => (
  <div>{children}</div>
);

export default Content;
