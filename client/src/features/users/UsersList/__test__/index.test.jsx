import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { StoreProvider } from 'store';
import RolesList from '../index';

describe('<RolesList />', () => {
  test('should display an item with correct link', () => {
    render(
      (
        <MemoryRouter>
          <StoreProvider>

            <RolesList users={[{
              name: 'User name',
              _id: '1234',
            },
            {
              name: 'User name b',
              _id: '5678',
            }]}
            />
          </StoreProvider>
        </MemoryRouter>
      ),
    );
    // screen.debug()
    expect(screen.getByText('User name')).toBeInTheDocument();
    expect(screen.getByText('User name b')).toBeInTheDocument();
    expect(screen.getByText('Create new')).toHaveAttribute('href', '//create');
  });
});
