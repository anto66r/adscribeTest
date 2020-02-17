import React from 'react';
import { render, screen } from '@testing-library/react';

import { RouteProvider } from 'testing';
import { StoreProvider } from 'store';
import RoleDetail from '..';

jest.mock('config/permissions');

const renderWrapper = () => render(
  (
    <RouteProvider route="/roles/1234" path="/roles/:id">
      <StoreProvider initialState={{
        roles: [{
          name: 'Role name',
          _id: '1234',
          permissions: ['permission A', 'permission D'],
        }, {
          name: 'another role',
          _id: '1235',
          permissions: ['permission A', 'permission D'],
        }],
      }}
      >
        <RoleDetail />
      </StoreProvider>
    </RouteProvider>
  ),
);

describe('<RoleDetail />', () => {
  test('should display a role correctly. Should only show permission A because permission D is not defined in global permission config.', () => {
    renderWrapper();
    // screen.debug();
    expect(screen.getByText('Role name')).toBeInTheDocument();
    expect(screen.getByText('Edit role')).toBeInTheDocument();
    expect(screen.getByText('permission A')).toBeInTheDocument();
    expect(screen.queryByText('permission D')).toBeFalsy();
  });
  test('Show show link to edit role.', () => {
    renderWrapper();
    expect(screen.getByTestId('pl2-role-edit')).toHaveAttribute('href', '/roles/edit/1234');
  });
});
