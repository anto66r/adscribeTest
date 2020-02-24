export const set = (state, {
  payload,
}) => ({
  ...state,
  domains: {
    ...state.domains,
    roles: payload.roles,
  },
});
