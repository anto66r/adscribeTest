import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { StoreProvider } from 'store';
import Item from '../Item';

describe('<Item />', () => {
  test('should display an item with correct link', () => {
    const test = render(
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
    expect(screen.getByText('User name')).toBeInTheDocument();
    expect(screen.getByTestId('pl2-role-itemlink')).toHaveAttribute('href', '//1234');
  });
});
