export default {
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    mandatorySignIn: false,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: process.env.REACT_APP_USER_POOL_BASE_URL,
      scope: [],
      responseType: 'code',
    },
  },
};
