/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { StoreProvider } from 'store';
import useItemAdmin from 'hooks/useItemAdmin';
import initialState from 'store/initialState';
import UsersEdit from '..';

jest.mock('store/initialState');
const mockDoSuccessToast = jest.fn();
const mockDoErrorToast = jest.fn();
jest.mock('hooks/useToast', () => () => ({
  doSuccessToast: mockDoSuccessToast,
  doErrorToast: mockDoErrorToast,
}));

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: 1234 }),
  useHistory: () => ({
    push: mockPush,
  }),
}));

jest.mock('components/UserForm');
jest.mock('hooks/useItemAdmin');

beforeEach(() => {
  useItemAdmin.mockImplementation(() => ({
    doUpdate: jest.fn(),
    loading: false,
  }));
});


const renderWrapper = () => render(
  (
    <StoreProvider
      initialState={initialState}
    >
      <UsersEdit />
    </StoreProvider>
  ),
);

describe('<UserEdit />', () => {
  test('should call success toast and go back on save', () => {
    const mockDoUpdate = jest.fn(({ onSuccess }) => onSuccess());
    useItemAdmin.mockImplementation(() => ({
      doUpdate: mockDoUpdate,
      loading: false,
    }));
    renderWrapper();
    fireEvent.submit(screen.getByTestId('form'));
    expect(mockDoUpdate).toHaveBeenCalled();
    expect(mockDoSuccessToast).toHaveBeenCalledWith('User updated');
    expect(mockPush).toHaveBeenCalled();
  });

  test('should call error toast on save error', () => {
    useItemAdmin.mockImplementation(() => ({
      doUpdate: ({ onError }) => { onError('Error message'); },
      loading: false,
    }));
    renderWrapper();
    fireEvent.submit(screen.getByTestId('form'));
    expect(mockDoErrorToast).toHaveBeenCalledWith('Error message');
  });
});
