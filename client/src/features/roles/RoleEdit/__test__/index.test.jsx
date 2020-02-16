/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { StoreProvider } from 'store';
import reducers from 'store/reducers';
import RoleEdit from '../index';
import useRoleAdmin from '../../hooks/useRoleAdmin';

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
jest.mock('../../hooks/useRoleAdmin');

beforeEach(() => {
  useRoleAdmin.mockImplementation(() => ({
    handleSubmit: jest.fn(),
    loading: false,
  }));
});


const renderWrapper = () => render(
  (
    <StoreProvider
      initialState={{
        roles: [{
          _id: '1234',
        }],
      }}
      reducer={reducers}
    >
      <RoleEdit />
    </StoreProvider>
  ),
);

describe('<RoleEdit />', () => {
  test('should handle cancel correctly', () => {
    renderWrapper();
    fireEvent.click(screen.getByTestId('Cancel'));
    expect(mockGoBack).toHaveBeenCalledWith();
  });

  test('should call success toast and go back on save', () => {
    useRoleAdmin.mockImplementation(({ onSuccess }) => ({
      handleSubmit: onSuccess,
      loading: false,
    }));
    renderWrapper();
    fireEvent.submit(screen.getByTestId('form'));
    expect(mockDoSuccessToast).toHaveBeenCalledWith('Role updated');
    expect(mockGoBack).toHaveBeenCalledWith();
  });

  test('should call error toast on save error', () => {
    useRoleAdmin.mockImplementation(({ onError }) => ({
      handleSubmit: () => { onError('Error message'); },
      loading: false,
    }));
    renderWrapper();
    fireEvent.submit(screen.getByTestId('form'));
    expect(mockDoErrorToast).toHaveBeenCalledWith('Error message');
  });
});
