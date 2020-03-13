import * as users from './users';
import * as roles from './roles';
import * as reports from './reports';
import * as user from './user';
import * as types from '../actions/types';

const createReducer = handlers => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  }

  return handlers[action.type](state, action);
};

export default createReducer({
  [types.SET_USERS]: users.set,
  [types.SET_REPORTS]: reports.set,
  [types.SET_ROLES]: roles.set,
  [types.SET_USER]: user.set,
  [types.SET_USER_AUTH]: user.setAuth,
  [types.SET_USER_LOGGED]: user.setLogged,
  [types.SET_USER_ID]: user.setUserId,
  [types.SET_USER_CONTEXT]: user.setUserContext,
});
