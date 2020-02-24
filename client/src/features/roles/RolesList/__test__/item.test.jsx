import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { StoreProvider } from 'store';
import Item from '../Item';

describe('<Item />', () => {
  test('should display an item with correct link', () => {
    render(
      (
        <MemoryRouter>
          <StoreProvider>
            <Item role={{
              name: 'Role name',
              _id: '1234',
            }}
            />
          </StoreProvider>
        </MemoryRouter>
      ),
    );
    expect(screen.getByText('Role name')).toBeInTheDocument();
    expect(screen.getByTestId('pl2-role-itemlink')).toHaveAttribute('href', '//1234');
  });
});
