export const set = (state, { payload }) => ({
  ...state,
  roles: payload.roles,
});
