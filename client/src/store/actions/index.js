import * as types from './types';

export const setUsers = users => ({
  type: types.SET_USERS,
  payload: { users },
});
