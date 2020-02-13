import { RoleDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';

// Init shared
const RolesRouter = Router();
const roleDao = new RoleDao();

/** ****************************************************************************
 *                      Get All Roles - "GET /api/roles"
 ***************************************************************************** */

RolesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const roles = await roleDao.getAll();
    return res.status(OK).json(roles);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/** ****************************************************************************
 *                       Add One - "POST /api/roles/add"
 ***************************************************************************** */

RolesRouter.post('/', async (req: Request, res: Response) => {
  try {
    const role = await roleDao.add(req.body);
    return res.status(OK).json(role);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/** ****************************************************************************
 *                       Update - "PATCH /api/roles/update"
 ***************************************************************************** */

RolesRouter.patch('/', async (req: Request, res: Response) => {
  try {
    const role = await roleDao.update(req.body);
    return res.status(OK).json(role);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/** ****************************************************************************
 *                    Delete - "DELETE /api/roles/delete/:_id"
 ***************************************************************************** */

RolesRouter.delete('/', async (req: Request, res: Response) => {
  try {
    const role = await roleDao.delete(req.body);
    return res.status(OK).json(role);
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

export default RolesRouter;
