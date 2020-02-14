import * as users from './users';
import * as roles from './roles';
import * as types from '../actions/types';

const createReducer = handlers => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  }

  return handlers[action.type](state, action);
};

export default createReducer({
  [types.SET_USERS]: users.set,
  [types.SET_ROLES]: roles.set,
});