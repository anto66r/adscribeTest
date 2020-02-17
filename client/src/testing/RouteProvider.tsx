import React, { FunctionComponent, ReactNode } from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

type ComponentProps = {
  path: string; route: string; children: ReactNode;
}

const RouteProvider: FunctionComponent<ComponentProps> = ({ path, route, children }) => (
  <MemoryRouter initialEntries={[route]}>
    <Route path={path}>
      {children}
    </Route>
  </MemoryRouter>
);

export default RouteProvider;
