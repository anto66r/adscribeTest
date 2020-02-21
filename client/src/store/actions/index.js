import * as types from './types';

export const setUsers = users => ({
  type: types.SET_USERS,
  payload: { users },
});

export const setUser = user => ({
  type: types.SET_USER,
  payload: { user },
});

export const setUserId = userId => ({
  type: types.SET_USER_ID,
  payload: { userId },
});

export const setUserAuth = auth => ({
  type: types.SET_USER_AUTH,
  payload: { auth },
});

export const setUserLogged = isLogged => ({
  type: types.SET_USER_LOGGED,
  payload: { isLogged },
});

export const setRoles = roles => ({
  type: types.SET_ROLES,
  payload: { roles },
});

export const setUserContext = context => ({
  type: types.SET_USER_CONTEXT,
  payload: context,
});
