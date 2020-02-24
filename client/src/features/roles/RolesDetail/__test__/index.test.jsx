import React from 'react';
import { render, screen } from '@testing-library/react';

import { RouteProvider } from 'testing';
import { StoreProvider } from 'store';
import initialState from 'store/initialState';
import RolesDetail from '..';

jest.mock('store/initialState');

screen.debug();

jest.mock('config/permissions');

const renderWrapper = () => render(
  (
    <RouteProvider route="/roles/1234" path="/roles/:id">
      <StoreProvider initialState={initialState}>
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
    expect(screen.getByText('permission A')).toBeInTheDocument();
    expect(screen.queryByText('permission D')).toBeFalsy();
  });
  test('Show show link to edit role.', () => {
    renderWrapper();
    expect(screen.getByTestId('pl2-role-edit')).toHaveAttribute('href', '/roles/edit/1234');
  });
});
