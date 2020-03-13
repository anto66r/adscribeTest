import {
  renderHook,
} from '@testing-library/react-hooks';
import {
  useStore,
} from 'store';
import useCurrentUser from '../useCurrentUser';

jest.mock('store');
useStore.mockImplementation(() => [{
  user: {
    userId: 'user 1',
  },
  domains: {
    users: [{
      id: 'user 1',
      roles: 'role A',
    }],
  },
}]);

describe('useCurrentUser', () => {
  test('should return value of current user', () => {
    const {
      result,
    } = renderHook(() => useCurrentUser());
    expect(result.current).toEqual({
      id: 'user 1',
      roles: 'role A',
    });
  });
});
