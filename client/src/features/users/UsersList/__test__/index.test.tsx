import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { StoreProvider } from 'store';
import usePermissions from 'hooks/usePermissions';
import RolesList from '../index';

jest.mock('hooks/usePermissions');
const mockedUsePermissions = usePermissions as jest.Mock;
mockedUsePermissions.mockImplementation(() => ({
  checkPermissions: (): boolean => true,
}));

const renderWrapper = (): void => {
  render(
    <MemoryRouter>
      <StoreProvider>

        <RolesList users={[{
          name: 'User name',
          email: 'email',
          _id: '1234',
        },
        {
          name: 'User name b',
          email: 'email',
          _id: '5678',
        }]}
        />
      </StoreProvider>
    </MemoryRouter>,
  );
};

describe('<UsersList />', () => {
  test('should display a list and a button to create a new item', () => {
    renderWrapper();
    expect(screen.getByText('User name')).toBeInTheDocument();
    expect(screen.getByText('User name b')).toBeInTheDocument();
    expect(screen.getByText('Create new')).toHaveAttribute('href', '//create');
  });
  test('should not display button to create a new item if user has no rights', () => {
    mockedUsePermissions.mockImplementation(() => ({
      checkPermissions: (): boolean => false,
    }));
    renderWrapper();
    expect(screen.queryByText('Create new')).toBeFalsy();
  });
});
