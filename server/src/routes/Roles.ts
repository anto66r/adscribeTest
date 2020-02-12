import { RoleDao } from "@daos";
import { logger } from "@shared";
import { Request, Response, Router } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";

// Init shared
const RolesRouter = Router();
const roleDao = new RoleDao();

/** ****************************************************************************
 *                      Get All Groups - "GET /api/groups/all"
 ***************************************************************************** */

RolesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const groups = await roleDao.getAll();
    return res.status(OK).json({ groups });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/** ****************************************************************************
 *                       Add One - "POST /api/groups/add"
 ***************************************************************************** */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
RolesRouter.post("/add", (req: Request, res: Response) => {
  console.log("add");
});

/** ****************************************************************************
 *                       Update - "PUT /api/groups/update"
 ***************************************************************************** */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
RolesRouter.put("/update", (req: Request, res: Response) => {
  console.log("update");
});

/** ****************************************************************************
 *                    Delete - "DELETE /api/groups/delete/:_id"
 ***************************************************************************** */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
RolesRouter.delete("/delete/:_id", (req: Request, res: Response) => {
  console.log("delete");
});

/** ****************************************************************************
 *                                     Export
 ***************************************************************************** */

export default RolesRouter;
