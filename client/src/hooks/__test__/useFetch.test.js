import {
  renderHook,
  act,
} from '@testing-library/react-hooks';
import {
  useStore,
} from 'store';
import {
  secureFetch,
} from 'helpers/fetching';
import useFetch from '../useFetch';

jest.mock('helpers/fetching');
beforeEach(() => {
  secureFetch.mockImplementation(
    () => Promise.resolve({
      data: ['data'],
    }),
  );
});

jest.mock('store');
useStore.mockImplementation(() => [{
  user: {
    auth: 'Authentication',
  },
}]);

const mockOnSuccess = jest.fn();
const mockOnError = jest.fn();

const fetchParams = {
  endpoint: '/url',
  payload: {
    payload: {},
  },
  method: 'METHOD',
};

const doFetch = fn => fn({
  ...fetchParams,
  onSuccess: mockOnSuccess,
  onError: mockOnError,
});

describe('useFetch', () => {
  test('transitions loading state correctly and calls fetch function', async () => {
    const {
      result,
    } = renderHook(() => useFetch());
    expect(result.current.loading).toBe(false);
    await act(async () => {
      await doFetch(result.current.doFetch);
    });
    expect(result.current.loading).toBe(false);
    expect(secureFetch).toHaveBeenCalledWith({
      auth: 'Authentication',
      ...fetchParams,
    });
  });
  test('Calls onSuccess callback', async () => {
    const {
      result,
    } = renderHook(() => useFetch());
    await act(async () => {
      await doFetch(result.current.doFetch);
    });
    expect(mockOnSuccess).toHaveBeenCalledWith(['data']);
  });

  test('Calls onError callback if fetch fails', async () => {
    secureFetch.mockImplementation(
      () => Promise.resolve({
        error: {
          message: 'An error',
        },
      }),
    );
    const {
      result,
    } = renderHook(() => useFetch());
    await act(async () => {
      await doFetch(result.current.doFetch);
    });

    expect(mockOnError).toHaveBeenCalledWith('An error');
  });
});
