/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { StoreProvider } from 'store';
import reducers from 'store/reducers';
import useItemAdmin from 'hooks/useItemAdmin';
import initialState from 'store/initialState';
import RolesEdit from '../index';

jest.mock('store/initialState');
jest.mock('config/permissions');

const mockDoSuccessToast = jest.fn();
const mockDoErrorToast = jest.fn();
jest.mock('hooks/useToast', () => () => ({
  doSuccessToast: mockDoSuccessToast,
  doErrorToast: mockDoErrorToast,
}));

const mockGoBack = jest.fn();
jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: 1234 }),
  useHistory: () => ({ goBack: mockGoBack }),
}));

jest.mock('components/RoleForm');
jest.mock('hooks/useItemAdmin');

beforeEach(() => {
  useItemAdmin.mockImplementation(() => ({
    doUpdate: () => jest.fn(),
    loading: false,
  }));
  jest.clearAllMocks();
});

const renderWrapper = () => render(
  (
    <StoreProvider
      initialState={initialState}
      reducer={reducers}
    >
      <RolesEdit />
    </StoreProvider>
  ),
);

describe('<RolesEdit />', () => {
  test('should call success toast and go back on save', () => {
    useItemAdmin.mockImplementation(() => ({
      doUpdate: ({ onSuccess }) => onSuccess(),
      loading: false,
    }));
    renderWrapper();
    fireEvent.submit(screen.getByTestId('form'));
    expect(mockDoSuccessToast).toHaveBeenCalledWith('Role updated');
    expect(mockGoBack).toHaveBeenCalledWith();
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
