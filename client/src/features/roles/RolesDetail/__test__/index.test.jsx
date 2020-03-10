import React from 'react';
import { render, screen } from '@testing-library/react';

import { RouteProvider } from 'testing';
import { StoreProvider } from 'store';
import usePermissions from 'hooks/usePermissions';
import RolesDetail from '..';

jest.mock('hooks/usePermissions');
const mockedUsePermissions = usePermissions;
mockedUsePermissions.mockImplementation(() => ({
  checkPermissions: () => true,
}));

const renderWrapper = () => render(
  (
    <RouteProvider route="/roles/1234" path="/roles/:id">
      <StoreProvider initialState={{
        domains: {
          roles: [{
            name: 'Role name',
            _id: '1234',
            permissions: ['users::create', 'permission D'],
          }, {
            name: 'another role',
            _id: '1235',
            permissions: ['users::create', 'permission D'],
          }],
        },
      }}
      >
        <RolesDetail />
      </StoreProvider>
    </RouteProvider>
  ),
);

describe('<RolesDetail />', () => {
  test('should display a role correctly. Should only show permission A because permission D is not defined in global permission config.', () => {
    renderWrapper();
    expect(screen.getByText('Role name')).toBeInTheDocument();
    expect(screen.getByText('Edit role')).toBeInTheDocument();
    expect(screen.getByText('users::create')).toBeInTheDocument();
    expect(screen.queryByText('permission D')).toBeFalsy();
  });
  test('Should show link to edit item.', () => {
    renderWrapper();
    expect(screen.getByTestId('pl2-role-edit')).toHaveAttribute('href', '/roles/edit/1234');
  });

  test('Should not show link to edit item if user has no rights.', () => {
    mockedUsePermissions.mockImplementation(() => ({
      checkPermissions: () => false,
    }));
    renderWrapper();
    expect(screen.queryByTestId('pl2-role-edit')).toBeFalsy();
  });
});
