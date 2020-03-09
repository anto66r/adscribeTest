export const set = (state: any, { payload }: { payload: any }) => ({
  ...state,
  user: payload.user,
});

export const setAuth = (state: any, { payload }: { payload: any }) => ({
  ...state,
  user: {
    ...payload.user,
    auth: payload,
  },
});

export const setLogged = (state: any, { payload }: {payload: any}) => ({
  ...state,
  user: {
    ...payload.user,
    isLogged: payload,
  },
});

export const setUserId = (state: any, { payload }: {payload: any}) => ({
  ...state,
  user: {
    ...payload.user,
    userId: payload,
  },
});

export const setUserContext = (state: any, { payload }: {payload: any}) => ({
  ...state,
  domains: {
    ...payload.domains,
    loaded: true,
  },
});
