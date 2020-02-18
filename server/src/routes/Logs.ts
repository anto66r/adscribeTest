import { logger } from '@shared';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

// Init shared
const LogsRouter: Router = Router();

LogsRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    const data: string = await readFileAsync('logs/combined.log', 'utf8');
    res.set('Content-Type', 'text/html');
    return res.send(Buffer.from(`<pre>${data}</pre>`));
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

export default LogsRouter;
