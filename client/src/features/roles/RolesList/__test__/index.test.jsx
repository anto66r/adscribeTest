import React from 'react';
import {
  render, screen, fireEvent, waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { StoreProvider } from 'store';
import axiosMock from 'axios';
import initialState from 'store/initialState';
import RolesList from '../index';

jest.mock('store/initialState');
jest.mock('axios');

const mockDoSuccessToast = jest.fn();
const mockDoErrorToast = jest.fn();
jest.mock('hooks/useToast', () => () => ({
  doSuccessToast: mockDoSuccessToast,
  doErrorToast: mockDoErrorToast,
}));

const renderWrapper = () => render(
  (
    <MemoryRouter>
      <StoreProvider>
        <RolesList />
      </StoreProvider>
    </MemoryRouter>
  ),
);

describe('<RolesList /> render', () => {
  test('should display an item with correct link', () => {
    renderWrapper();
    expect(screen.getByText('Role name')).toBeInTheDocument();
    expect(screen.getByText('another role')).toBeInTheDocument();
    expect(screen.getByText('Create new')).toHaveAttribute('href', '//create');
  });
});
describe('<RolesList /> delete', () => {
  test('should delete an item correctly', async () => {
    axiosMock.request.mockImplementation(() => Promise.resolve({
      data: {
        data: initialState.domains.roles.filter(item => item?.id !== '1234'),
      },
    }));
    renderWrapper();
    fireEvent.click(screen.getByTestId('pl2-delete-role-1234'));
    expect(screen.getByTestId('pl2-delete-role-1234')).toHaveAttribute('disabled');
    await waitForElementToBeRemoved(() => screen.getByText(/deleting/i));
    expect(screen.queryByText('Role name')).toBeFalsy();
    expect(mockDoSuccessToast).toHaveBeenCalledWith('Role deleted');
  });
  test('should show toast on delete error', async () => {
    axiosMock.request.mockImplementation(() => Promise.reject(Error('Error')));
    renderWrapper();
    fireEvent.click(screen.getByTestId('pl2-delete-role-1234'));
    expect(screen.getByTestId('pl2-delete-role-1234')).toHaveAttribute('disabled');
    await waitForElementToBeRemoved(() => screen.getByText(/deleting.../i));
    expect(screen.queryByText('Role name')).toBeInTheDocument();
    expect(mockDoErrorToast).toHaveBeenCalledWith('Error');
  });
});
