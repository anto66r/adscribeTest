import { UserDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import { TRequestParams } from 'src/daos/User/types';
import { IUser, IUserCollection, IUserGeneralCollection } from '../services';

// Init shared
const UsersRouter: Router = Router();
const userDao: UserDao = new UserDao();


UsersRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await userDao.getAll();
    return res.status(OK).json(users); // define later if we should wrap them in a property
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

UsersRouter.post('/login', async (req: Request, res: Response): Promise<Response> => {
  const { authId, email } = req.body;
  try {
    let foundUser: IUserCollection = await userDao.getByAuthId(authId);

    if (!foundUser.data.length) {
      // This means the user was created directly from cognito, so we should create it

      const newUser = {
        authId,
        email,
        name: email,
      };
      foundUser = await userDao.add(newUser);
    }

    return res.status(OK).json(foundUser);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

UsersRouter.post('/', async (req: Request, res: Response) => {
  const {
    name, email, authId, roles,
  } = req.body;
  const newUser: IUser = {
    authId,
    name,
    email,
    roles,
  };

  try {
    const user = await userDao.add(newUser);
    return res.status(OK).json(user);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

UsersRouter.patch('/', async (req: Request, res: Response) => {
  try {
    const user = await userDao.update(req.body);
    return res.status(OK).json(user);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

UsersRouter.delete('/', async (req: Request, res: Response) => {
  try {
    const { _id }: {_id: string} = req.body as TRequestParams;
    const users = await userDao.delete(_id);
    return res.status(OK).json(users);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

UsersRouter.post('/context', async (req: Request<TRequestParams>, res: Response): Promise<Response> => {
  try {
    const { _id }: {_id: string} = req.body;
    const userContext: IUserGeneralCollection = await userDao.getUserContext(_id);

    return res.status(OK).json(userContext);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});


export default UsersRouter;
