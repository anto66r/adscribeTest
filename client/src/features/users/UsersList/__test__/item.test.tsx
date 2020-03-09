import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { StoreProvider } from 'store';
import usePermissions from 'hooks/usePermissions';
import Permission from 'types/permission';
import Item from '../Item';

jest.mock('hooks/usePermissions');
const mockedUsePermissions = usePermissions as jest.Mock;
mockedUsePermissions.mockImplementation(() => ({
  checkPermissions: (): boolean => true,
}));

const renderWrapper = (): void => {
  render(
    (
      <MemoryRouter>
        <StoreProvider>
          <Item user={{
            name: 'User name',
            email: 'email@test.com',
            _id: '1234',
          }}
          />
        </StoreProvider>
      </MemoryRouter>
    ),
  );
};

describe('<Item />', () => {
  test('should display an item with correct link', () => {
    renderWrapper();
    expect(screen.getByText('User name')).toBeInTheDocument();
    expect(screen.getByTestId('pl2-user-itemlink')).toHaveAttribute('href', '//1234');
  });

  test('should display a delete button', () => {
    renderWrapper();
    expect(screen.getByTestId('user-itemDelete')).toBeInTheDocument();
  });

  test('should not display link to detail if user has no permissions', () => {
    mockedUsePermissions.mockImplementation(() => ({
      checkPermissions: (permission: Permission): boolean => permission === Permission.USERS__DETAIL,
    }));
    renderWrapper();
    expect(screen.getByText('User name')).toBeInTheDocument();
    expect(screen.queryByTestId('user-itemDelete')).toBeFalsy();
    expect(screen.getByTestId('pl2-user-itemlink')).toBeTruthy();
  });

  test('should not display delete button if user has no permissions', () => {
    mockedUsePermissions.mockImplementation(() => ({
      checkPermissions: (permission: Permission): boolean => permission === Permission.USERS__DELETE,
    }));
    renderWrapper();
    expect(screen.getByText('User name')).toBeInTheDocument();
    expect(screen.queryByTestId('pl2-user-itemlink')).toBeFalsy();
    expect(screen.getByTestId('user-itemDelete')).toBeTruthy();
  });
});
