const CognitoExpress = require('cognito-express');
const publicRouter = require('express').Router();
const authenticatedRouter = require('express').Router();

const BYPASS_SECURITY = true;

//Initializing CognitoExpress constructor // todo: change to config file
const cognitoExpress = new CognitoExpress({
  region: 'eu-west-1',
  cognitoUserPoolId: 'eu-west-1_FbvelNMmP',
  tokenUse: 'access', //Possible Values: access | id
  tokenExpiration: 3600000, //Up to default expiration of 1 hour (3600000 ms)
});

module.exports = app => {

  // Validation middleware
  authenticatedRouter.use((req, res, next) => {
    //I'm passing in the access token in header under key accessToken
    let accessTokenFromClient = req.headers.accesstoken;

    //Fail if token not present in header.
    if (BYPASS_SECURITY) {
      next();
      return;
    }

    if (!accessTokenFromClient) return res.status(401).send({
      result: false,
      message: `Access Token missing from header!`,
    });

    cognitoExpress.validate(accessTokenFromClient, (err, response) => {

      //If API is not authenticated, Return 401 with error message.
      if (err) return res.status(401).send({
        result: false,
        mesage: err,
      });

      //Else API has been authenticated. Proceed.
      res.locals.user = response;
      next();
    });

  });

  // Protected endpoints (passing authenticatedRouter and populating it
  app.use('/api/users', require('./user/routes')(authenticatedRouter));
  // ... add more here! like > app.use('/api/users', userRouter);

  // Unprotected endpoints
  app.use('/auth', require('./auth/routes')(publicRouter));

  publicRouter.get('/api', (req, res) => {
    res.send({
      message: 'api endpoint',
    });
  });

  return publicRouter;

};
