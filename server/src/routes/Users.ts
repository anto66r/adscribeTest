import { UserDao } from '@daos';
import { logger, paramMissingError } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { IUserCollection } from '../services';

// Init shared
const UsersRouter = Router();
const userDao = new UserDao();


UsersRouter.get('/', async (req: Request, res: Response) => {
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

UsersRouter.post('/login', async (req: Request, res: Response) => {
  const { user, cognitoId } = req.body;
  try {
    const foundUser: IUserCollection = await userDao.findUser(user);
    if (!foundUser.data.length) {
      userDao.createUser(user, cognitoId);
    }
    return res.status(OK).json(foundUser);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

UsersRouter.post('/add', async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    if (!user) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
    await userDao.add(user);
    return res.status(CREATED).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});


UsersRouter.put('/update', async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    if (!user) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError,
      });
    }
    await userDao.update(user);
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

UsersRouter.delete('/delete/:_id', async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    await userDao.delete(_id);
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default UsersRouter;
