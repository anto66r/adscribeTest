import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useItemAdmin from 'hooks/useItemAdmin';

import { StoreProvider } from 'store';
import usePermissions from 'hooks/usePermissions';
import Permission from 'types/permission';

import Item from '../Item';

jest.mock('hooks/usePermissions');
const mockedUsePermissions = usePermissions as jest.Mock;
mockedUsePermissions.mockImplementation(() => ({
  checkPermissions: (): boolean => true,
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
          <Item report={{
            name: 'Report name',
            userId: '2',
            id: '1234',
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
    expect(screen.getByText('Report name')).toBeInTheDocument();
    expect(screen.getByTestId('pl2-report-item--updateLink')).toHaveAttribute('href', '//edit/1234');
  });

  test('should display a delete button', () => {
    renderWrapper();
    expect(screen.getByTestId('pl2-report-item--delete')).toBeInTheDocument();
  });

  test('on deletion success should run callbacks', () => {
    renderWrapper();
    fireEvent.click(screen.getByTestId('pl2-report-item--delete'));
    expect(mockedDoDelete).toHaveBeenCalled();
  });

  test('should not display link to detail if user has no permissions', () => {
    mockedUsePermissions.mockImplementation(() => ({
      checkPermissions: (permission: Permission): boolean => permission === Permission.REPORTS__UPDATE,
    }));
    renderWrapper();
    expect(screen.getByText('Report name')).toBeInTheDocument();
    expect(screen.queryByTestId('pl2-report-item--delete')).toBeFalsy();
    expect(screen.getByTestId('pl2-report-item--updateLink')).toBeTruthy();
  });

  test('should not display delete button if user has no permissions', () => {
    mockedUsePermissions.mockImplementation(() => ({
      checkPermissions: (permission: Permission): boolean => permission === Permission.REPORTS__DELETE,
    }));
    renderWrapper();
    expect(screen.getByText('Report name')).toBeInTheDocument();
    expect(screen.queryByTestId('pl2-report-item--updateLink')).toBeFalsy();
    expect(screen.getByTestId('pl2-report-item--delete')).toBeTruthy();
  });
});
