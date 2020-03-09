import {
  renderHook,
} from '@testing-library/react-hooks';
import {
  useStore,
} from 'store';
import Permission from 'types/permission';
import useCurrentUser from '../useCurrentUser';

jest.mock('store');
useStore.mockImplementation(() => [{
  user: {
    userId: 'user 1',
  },
  domains: {
    users: [{
      _id: 'user 1',
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
      _id: 'user 1',
      roles: 'role A',
    });
  });
});
