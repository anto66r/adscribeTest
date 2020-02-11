import { UserDao } from '@daos';
import { logger, paramMissingError } from '@shared';
import {
  Request, Response, Router,
} from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';

// Init shared
const UsersRouter = Router();
const userDao = new UserDao();

/** ****************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ***************************************************************************** */

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

/** ****************************************************************************
 *                       Add One - "POST /api/users/add"
 ***************************************************************************** */

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

/** ****************************************************************************
 *                       Update - "PUT /api/users/update"
 ***************************************************************************** */

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

/** ****************************************************************************
 *                    Delete - "DELETE /api/users/delete/:_id"
 ***************************************************************************** */

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

/** ****************************************************************************
 *                                     Export
 ***************************************************************************** */

export default UsersRouter;
