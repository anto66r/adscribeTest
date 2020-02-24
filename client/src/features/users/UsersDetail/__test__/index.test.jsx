import React from 'react';
import { render, screen } from '@testing-library/react';

import { RouteProvider } from 'testing';
import { StoreProvider } from 'store';
import initialState from 'store/initialState';
import UsersDetail from '..';

jest.mock('store/initialState');
jest.mock('config/permissions');

const renderWrapper = () => render(
  (
    <RouteProvider route="/users/2" path="/users/:id">
      <StoreProvider initialState={initialState}>
        <UsersDetail />
      </StoreProvider>
    </RouteProvider>
  ),
);

describe('<UsersDetail />', () => {
  test('should display a user correctly. Should only show "Role name".', () => {
    renderWrapper();
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('Edit user')).toBeInTheDocument();
    expect(screen.queryByText('another role')).toBeFalsy();
  });
  test('Show show link to edit role.', () => {
    renderWrapper();
    expect(screen.getByTestId('pl2-role-edit')).toHaveAttribute('href', '/users/edit/2');
  });
});
