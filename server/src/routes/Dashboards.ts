import { DashboardDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';

// Init shared
const DashboardsRouter = Router();
const dashboardDao = new DashboardDao();


DashboardsRouter.post('/', async (req: Request, res: Response) => {
  const { userId }: {userId: string} = req.body;
  try {
    const dashboards = await dashboardDao.getByUser(userId);
    return res.status(OK).json(dashboards); // define later if we should wrap them in a property
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default DashboardsRouter;
