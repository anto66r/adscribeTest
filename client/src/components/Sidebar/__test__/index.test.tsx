import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StoreProvider } from 'store';
import { RouteProvider } from 'testing';
import usePermissions from 'hooks/usePermissions';

import Sidebar from '..';

jest.mock('store/initialState');
jest.mock('hooks/usePermissions');
const mockedUsePermissions = usePermissions as jest.Mock;

mockedUsePermissions.mockImplementation(() => ({
  checkPermissions: (): boolean => true,
}));

const renderWrapper = (): void => {
  render(
    (
      <RouteProvider path="" route="/dashboards">
        <StoreProvider>
          <Sidebar />
        </StoreProvider>
      </RouteProvider>
    ),
  );
};

describe('Sidebar', () => {
  test('expands when mouse hovers and contracts on mouse out', async () => {
    renderWrapper();
    const sidebar = await screen.findByTestId('sidebar');
    expect(sidebar).not.toHaveClass('expanded');
    fireEvent.mouseOver(sidebar);
    expect(sidebar).toHaveClass('expanded');
    fireEvent.mouseOut(sidebar);
    expect(sidebar).not.toHaveClass('expanded');
  });
  describe('when expanded', () => {
    test('shows all section names', async () => {
      renderWrapper();
      const sidebar = await screen.findByTestId('sidebar');
      fireEvent.mouseOver(sidebar);
      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.getByText('Reports')).toBeInTheDocument();
      expect(screen.getByText('Roles')).toBeInTheDocument();
      expect(screen.getByText('Test API')).toBeInTheDocument();
    });
  });

  describe('for limited access roles', () => {
    test('should only show Dashboards', async () => {
      mockedUsePermissions.mockImplementation(() => ({
        checkPermissions: (): boolean => false,
      }));
      renderWrapper();
      const sidebar = await screen.findByTestId('sidebar');
      fireEvent.mouseOver(sidebar);
      expect(screen.queryByText('Users')).toBeFalsy();
      expect(screen.getByText('Test API')).toBeInTheDocument();
    });
  });
});
