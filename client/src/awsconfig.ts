export default {
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    mandatorySignIn: false,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: process.env.REACT_APP_USER_POOL_BASE_URL,
      scope: [
        'aws.cognito.signin.user.admin',
        'openid',
        'email',
        'profile',
        'http://localhost:5000/api',
        'http://platf0rm-2-lb-1034170497.eu-west-1.elb.amazonaws.com/api',
        'transactions/api',
        'transactions/post',
        'transactions/get',
        'api',
        'post',
        'get',
      ],
      redirectSignOut: process.env.REACT_APP_COGNITO_SIGNOUT_URL,
      responseType: 'code',
    },
  },
};
