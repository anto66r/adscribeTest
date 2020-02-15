import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import { StoreProvider } from 'store';
import reducers from 'store/reducers';
// import initialState from 'store/initialState';
import RoleEdit from '../index';

describe('<RoleEdit />', () => {
  test('should display an item with correct link', () => {
    render(
      (
        <StoreProvider
          initialState={{
            roles: [{
              name: 'Role name',
              _id: '1234',
            }],
          }}
          reducer={reducers}
        >
          <MemoryRouter initialEntries={['/users/1234']}>
            <Route path="/users/:id">
              <RoleEdit />
            </Route>
          </MemoryRouter>
        </StoreProvider>
      ),
    );
    screen.debug();
    // expect(screen.getByText('Role name')).toBeInTheDocument();
    // expect(screen.getByText('Role name 2')).toBeInTheDocument();
    // expect(screen.getByText('Create new')).toHaveAttribute('href', '//create')
  });
});
