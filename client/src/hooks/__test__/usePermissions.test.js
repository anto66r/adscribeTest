import {
  renderHook,
} from '@testing-library/react-hooks';
import {
  useStore,
} from 'store';
import Permission from 'types/permission';
import usePermissions from '../usePermissions';

jest.mock('store');
useStore.mockImplementation(() => [{
  user: {
    userId: 'user 1',
  },
  domains: {
    roles: [
      {
        id: 'role A',
        permissions: ['users::view'],
      },
      {
        id: 'role B',
        permissions: ['users::view', 'users::create'],
      },
    ],
    users: [{
      id: 'user 1',
      roles: 'role A',
    }],
  },
}]);

describe('usePermissions', () => {
  test('should return true for USERS__VIEW, false for USERS__CREATE', () => {
    const {
      result,
    } = renderHook(() => usePermissions());
    expect(result.current.checkPermissions(Permission.USERS__VIEW)).toBe(true);
    expect(result.current.checkPermissions(Permission.USERS__CREATE)).toBe(false);
  });
});
