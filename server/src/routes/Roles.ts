import { RoleDao } from "@daos";
import { logger } from "@shared";
import { Request, Response, Router } from "express";
import { BAD_REQUEST, OK } from "http-status-codes";

// Init shared
const RolesRouter = Router();
const roleDao = new RoleDao();

/** ****************************************************************************
 *                      Get All Roles - "GET /api/roles"
 ***************************************************************************** */

RolesRouter.get("/", async (req: Request, res: Response) => {
  console.log("roles");
  try {
    const roles = await roleDao.getAll();
    return res.status(OK).json(roles);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/** ****************************************************************************
 *                       Add One - "POST /api/roles/add"
 ***************************************************************************** */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
RolesRouter.post("/add", (req: Request, res: Response) => {
  console.log("add");
});

/** ****************************************************************************
 *                       Update - "PATCH /api/roles/update"
 ***************************************************************************** */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
RolesRouter.patch("/update", (req: Request, res: Response) => {
  console.log("update");
});

/** ****************************************************************************
 *                    Delete - "DELETE /api/roles/delete/:_id"
 ***************************************************************************** */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
RolesRouter.delete("/delete/:_id", (req: Request, res: Response) => {
  console.log("delete");
});

/** ****************************************************************************
 *                                     Export
 ***************************************************************************** */

export default RolesRouter;
