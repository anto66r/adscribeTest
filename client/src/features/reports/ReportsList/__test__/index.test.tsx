import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { StoreProvider } from 'store';
import usePermissions from 'hooks/usePermissions';
import ReportsList from '../index';

jest.mock('hooks/usePermissions');
const mockedUsePermissions = usePermissions as jest.Mock;
mockedUsePermissions.mockImplementation(() => ({
  checkPermissions: (): boolean => true,
}));

const renderWrapper = (): void => {
  render(
    <MemoryRouter>
      <StoreProvider>
        <ReportsList reports={[{
          name: 'Report name',
          id: '1234',
          userId: '2',
        },
        {
          name: 'Report name b',
          id: '5678',
          userId: '2',
        }]}
        />
      </StoreProvider>
    </MemoryRouter>,
  );
};

describe('<RolesList />', () => {
  test('should display a list and a button to create a new item', () => {
    renderWrapper();
    expect(screen.getByText('Report name')).toBeInTheDocument();
    expect(screen.getByText('Report name b')).toBeInTheDocument();
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
