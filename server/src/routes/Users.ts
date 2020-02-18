import { UserDao } from '@daos';

import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';
import { v4 as uuid } from 'uuid';
import { IUserCollection } from '../services';

// Init shared
const UsersRouter = Router();
const userDao = new UserDao();


UsersRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userDao.getAll();
    return res.status(OK).json(users);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

UsersRouter.post('/login', async (req: Request, res: Response) => {
  // const { user, cognitoId } = req.body;
  const { user } = req.body;
  try {
    const foundUser: IUserCollection = await userDao.findUser(user);
    // if (!foundUser.data.length) {
    //   userDao.createUser(user, cognitoId);
    // }
    return res.status(OK).json(foundUser);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

UsersRouter.post('/', async (req: Request, res: Response) => {
  try {
    const user = await userDao.add({ ...req.body, cognitoId: uuid() });
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
    const user = await userDao.delete(req.body);
    return res.status(OK).json(user);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default UsersRouter;
