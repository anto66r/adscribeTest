export const set = (state, { payload }) => ({
  ...state,
  users: payload.users
});
