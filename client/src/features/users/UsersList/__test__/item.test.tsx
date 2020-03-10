import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useItemAdmin from 'hooks/useItemAdmin';

import { StoreProvider } from 'store';
import usePermissions from 'hooks/usePermissions';
import Permission from 'types/permission';
import { hookReturn } from 'hooks/useToast';

import Item from '../Item';

jest.mock('hooks/usePermissions');
const mockedUsePermissions = usePermissions as jest.Mock;
mockedUsePermissions.mockImplementation(() => ({
  checkPermissions: (): boolean => true,
}));

const mockDoSuccessToast = jest.fn();
const mockDoErrorToast = jest.fn();
jest.mock('hooks/useToast', () => (): hookReturn => ({
  doSuccessToast: mockDoSuccessToast,
  doErrorToast: mockDoErrorToast,
}));

const mockedDoDelete = jest.fn();
const mockedUseItemAdmin = useItemAdmin as jest.Mock;
jest.mock('hooks/useItemAdmin');
beforeEach(() => {
  mockedUseItemAdmin.mockImplementation(() => ({
    doDelete: mockedDoDelete,
    loading: false,
  }));
});


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

  test('on deletion success should run callbacks', () => {
    renderWrapper();
    fireEvent.click(screen.getByTestId('user-itemDelete'));
    expect(mockedDoDelete).toHaveBeenCalledWith(
      { item: { _id: '1234', email: 'email@test.com', name: 'User name' }, onError: expect.any(Function), onSuccess: expect.any(Function) },
    );
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
