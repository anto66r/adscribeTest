import { Router } from "express";
// - no types exist for cognito-express
// @ts-ignore
import CognitoExpress from "cognito-express";
import cors from "cors";
import GroupsRouter from "./Groups";
import UsersRouter from "./Users";
import RolesRouter from "./Roles";
// Init router and path
const router = Router();

const BYPASS_SECURITY = false;

// Initializing CognitoExpress constructor // todo: change to config file
const cognitoExpress = new CognitoExpress({
  region: process.env.COGNITO_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL,
  tokenUse: "access", // Possible Values: access | id
  tokenExpiration: Number(process.env.COGNITO_COOKIE_LIFE_TIME) || 30 // Up to default expiration of 1 hour (3600000 ms)
});

const options: cors.CorsOptions = {
  origin: "*"
};

// use cors middleware
router.use(cors(options));

router.use((req, res, next): any | undefined => {
  // I'm passing in the access token in header under key accessToken
  const accessTokenFromClient = req.headers.accesstoken;

  // Fail if token not present in header.
  if (process.env.NODE_ENV === "development" && BYPASS_SECURITY) {
    next();
    return undefined;
  }

  if (!accessTokenFromClient) {
    return res.status(401).send({
      result: false,
      message: "Access Token missing from header!"
    });
  }

  return cognitoExpress.validate(
    accessTokenFromClient,
    (err: Error, response: Response): any | undefined => {
      // If API is not authenticated, Return 401 with error message.
      if (err) {
        return res.status(401).send({
          result: false,
          mesage: err
        });
      }

      // Else API has been authenticated. Proceed.
      res.locals.user = response;
      next();
      return null;
    }
  );
});

// Add sub-routes
router.use("/users", UsersRouter);
router.use("/groups", GroupsRouter);
router.use("/roles", RolesRouter);

router.options("*", cors(options));

// Export the base-router
export default router;
