export const set = (state, {
  payload,
}) => ({
  ...state,
  domains: {
    ...state.domains,
    reports: payload.reports,
  },
});
