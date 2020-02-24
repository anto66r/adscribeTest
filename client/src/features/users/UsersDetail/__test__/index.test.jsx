import React from 'react';
import { render, screen } from '@testing-library/react';

import { RouteProvider } from 'testing';
import { StoreProvider } from 'store';
import UsersDetail from '..';

jest.mock('config/permissions');

const renderWrapper = () => render(
  (
    <RouteProvider route="/users/2" path="/users/:id">
      <StoreProvider initialState={{
        domains: {

          users: [{
            username: 'User 1',
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
        },
      }}
      >
        <UsersDetail />
      </StoreProvider>
    </RouteProvider>
  ),
);

describe('<UsersDetail />', () => {
  test('should display a user correctly. Should only show "Role name".', () => {
    renderWrapper();
    screen.debug();
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('Edit user')).toBeInTheDocument();
    expect(screen.queryByText('another role')).toBeFalsy();
  });
  test('Show show link to edit role.', () => {
    renderWrapper();
    expect(screen.getByTestId('pl2-role-edit')).toHaveAttribute('href', '/users/edit/2');
  });
});
