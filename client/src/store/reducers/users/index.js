export const set = (state, {
  payload,
}) => ({
  ...state,
  domains: {
    ...state.domains,
    users: payload.users,
  },
});
