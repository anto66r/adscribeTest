import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider } from 'store';
import Item from '../Item';

const renderWrapper = () => render(
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

describe('<Item />', () => {
  test('should display an item with correct link', () => {
    renderWrapper();
    expect(screen.getByText('Role name')).toBeInTheDocument();
    expect(screen.getByTestId('pl2-role-itemlink')).toHaveAttribute('href', '//1234');
  });
  test('should display a delete button', () => {
    renderWrapper();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});
