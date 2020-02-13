import * as types from './types';

export const setUsers = users => ({
  type: types.SET_USERS,
  payload: { users },
});

export const setRoles = roles => ({
  type: types.SET_ROLES,
  payload: { roles },
});
