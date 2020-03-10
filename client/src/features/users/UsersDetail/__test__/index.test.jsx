import React from 'react';
import { render, screen } from '@testing-library/react';

import { RouteProvider } from 'testing';
import { StoreProvider } from 'store';
import usePermissions from 'hooks/usePermissions';
import UsersDetail from '..';

jest.mock('hooks/usePermissions');
const mockedUsePermissions = usePermissions;
mockedUsePermissions.mockImplementation(() => ({
  checkPermissions: () => true,
}));

const renderWrapper = () => {
  render(
    <RouteProvider route="/users/2" path="/users/:id">
      <StoreProvider initialState={{
        user: {
          userId: '1',
          auth: {},
        },
        domains: {
          users: [{
            email: 'test@email.com',
            name: 'Test user',
            _id: '2',
            roles: ['1234'],
          }],
          roles: [{
            name: 'Role name',
            _id: '1234',
            permissions: ['permission A'],
          }, {
            name: 'another role',
            _id: '1235',
            permissions: ['permission A', 'permission D'],
          }],
          dashboards: [{}],
          loaded: true,
        },
      }}
      >
        <UsersDetail />
      </StoreProvider>
    </RouteProvider>,
  );
};

describe('<UsersDetail />', () => {
  test('should display a user correctly. Should only show "Role name".', () => {
    renderWrapper();
    expect(screen.getByText('Test user')).toBeInTheDocument();
    expect(screen.getByText('Edit user')).toBeInTheDocument();
    expect(screen.getByText('Role name')).toBeInTheDocument();
    expect(screen.queryByText('another role')).toBeFalsy();
  });

  test('Should show link to edit item.', () => {
    renderWrapper();
    expect(screen.getByTestId('pl2-user-edit')).toHaveAttribute('href', '/users/edit/2');
  });

  test('Should not show link to edit item if user has no rights.', () => {
    mockedUsePermissions.mockImplementation(() => ({
      checkPermissions: () => false,
    }));
    renderWrapper();
    expect(screen.queryByTestId('pl2-user-edit')).toBeFalsy();
  });
});
