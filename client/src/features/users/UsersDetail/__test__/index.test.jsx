import React from 'react';
import { render, screen } from '@testing-library/react';

import { RouteProvider } from 'testing';
import { StoreProvider } from 'store';
import usePermissions from 'hooks/usePermissions';
import initialState from 'store/initialState';
import UsersDetail from '..';

jest.mock('hooks/usePermissions');
const mockedUsePermissions = usePermissions;
mockedUsePermissions.mockImplementation(() => ({
  checkPermissions: () => true,
}));

jest.mock('store/initialState');

const renderWrapper = () => {
  render(
    <RouteProvider route="/users/2" path="/users/:id">
      <StoreProvider initialState={initialState}>
        <UsersDetail />
      </StoreProvider>
    </RouteProvider>,
  );
};

describe('<UsersDetail />', () => {
  test('should display a user correctly. Should only show "Role name".', () => {
    renderWrapper();
    expect(screen.getByText('User 1')).toBeInTheDocument();
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
