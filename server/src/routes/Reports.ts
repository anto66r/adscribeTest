import { ReportDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';

// Init shared
const ReportsRouter = Router();
const reportDao = new ReportDao();

/** ****************************************************************************
 *                      Get All Reports - "GET /api/reports"
 ***************************************************************************** */

ReportsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const roles = await reportDao.getAll();
    return res.status(OK).json(roles);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/** ****************************************************************************
 *                       Add One - "POST /api/reports/add"
 ***************************************************************************** */

ReportsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const role = await reportDao.add(req.body);
    return res.status(OK).json(role);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/** ****************************************************************************
 *                       Update - "PATCH /api/reports/update"
 ***************************************************************************** */

ReportsRouter.patch('/', async (req: Request, res: Response) => {
  try {
    const role = await reportDao.update(req.body);
    return res.status(OK).json(role);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/** ****************************************************************************
 *                    Delete - "DELETE /api/reports/delete/:id"
 ***************************************************************************** */

ReportsRouter.delete('/', async (req: Request, res: Response) => {
  try {
    const role = await reportDao.delete(req.body);
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

export default ReportsRouter;
