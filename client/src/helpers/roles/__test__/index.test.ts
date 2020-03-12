import { getPermissions, getRoles } from '..';

describe('getPermissions', () => {
  test('should return common permissions', () => {
    expect(getPermissions(['no show permission', 'users::create'])).toEqual(['users::create']);
  });
});

describe('getRoles', () => {
  test('should return common roles', () => {
    expect(getRoles(['no show role', 'role A'], [{ _id: 'role A', name: 'name A' }, { _id: 'role B', name: 'name B' }])).toEqual([{ _id: 'role A', name: 'name A' }]);
  });
});
