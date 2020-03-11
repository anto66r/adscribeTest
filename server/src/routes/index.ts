// - no types exist for cognito-express
// @ts-ignore
import CognitoExpress from 'cognito-express';
import cors from 'cors';
import { Router } from 'express';
import GroupsRouter from './Groups';
import UsersRouter from './Users';
import RolesRouter from './Roles';
import DashboardsRouter from './Dashboards';
import LogsRouter from './Logs';
// Init router and path
const router = Router();

// Initializing CognitoExpress constructor // todo: change to config file
const cognitoExpress = new CognitoExpress({
  region: process.env.COGNITO_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL,
  tokenUse: 'access', // Possible Values: access | id
  tokenExpiration: Number(process.env.COGNITO_COOKIE_LIFE_TIME) || 3600000, // Up to default expiration of 1 hour (3600000 ms)
});

const freeUrls: string[] = [
  '/logs',
  '/',
];

const options: cors.CorsOptions = {
  origin: '*',
};

// use cors middleware
router.use(cors(options));

router.use('/health-check', (req, res): any => { res.send('OK'); });

router.use((req, res, next): any => {
  // I'm passing in the access token in header under key accessToken
  const accessTokenFromClient = req.headers.accesstoken;
  // console.log(`Access token obtained: ${accessTokenFromClient}`);

  // Fail if token not present in header.
  if (process.env.NODE_ENV === 'development' && (process.env.BYPASS_API_SECURITY === 'true' || freeUrls.includes(req.url))) {
    next();
    return undefined;
  }

  if (!accessTokenFromClient) {
    return res.status(401).send({
      result: false,
      message: 'Access Token missing from header!',
    });
  }

  return cognitoExpress.validate(
    accessTokenFromClient,
    (err: Error, response: Response): any | undefined => {
      // If API is not authenticated, Return 401 with error message.
      if (err) {
        return res.status(401).send({
          result: false,
          message: err,
        });
      }

      // Else API has been authenticated. Proceed.
      res.locals.user = response;
      next();
      return null;
    },
  );
});

// Add sub-routes
router.use('/users', UsersRouter);
router.use('/groups', GroupsRouter);
router.use('/dashboards', DashboardsRouter);
router.use('/roles', RolesRouter);
router.use('/logs', LogsRouter);

router.use('*', (req, res) => {
  res.send('api root!');
});

// Status 404 (Error) middleware
router.use('*', (req, res) => {
  res.status(404);
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify({
    result: false,
    message: 'Endpoint does not exist',
    response: {
      statusCode: res.statusCode,
    },
    request: {
      url: req.url,
      method: req.method,
      baseUrl: req.baseUrl,
      originalUrl: req.originalUrl,
      params: req.params,
      body: req.body,
      cookies: req.headers.host,
    },
  }, null, 2));
});

router.options('*', cors(options));

// Export the base-router
export default router;
