// Modules
import { Request, Response, Router } from "express";
import { CreateRoleController } from "../controllers/roles/CreateRoleController";
import { ListRolesController } from "../controllers/roles/ListRolesController";
import { DetailRoleController } from "../controllers/roles/DetailRoleController";
import { DeleteRoleController } from "../controllers/roles/DeleteRoleController";
import { UpdateRoleController } from "../controllers/roles/UpdateRoleController";

// Role routes instance router
const roleRoutes = Router();

// Create roles controller instances
const createRoleController = new CreateRoleController();
const listRoleController = new ListRolesController();
const detailRoleController = new DetailRoleController();
const deleteRoleController = new DeleteRoleController();
const updateRoleController = new UpdateRoleController();

// Routes
roleRoutes.post("/create/", async (req: Request, res: Response) => {
  await createRoleController.execute(req, res);
});

roleRoutes.get("/detail/:id/", async (req: Request, res: Response) => {
  await detailRoleController.execute(req, res);
});

roleRoutes.get("/list/", async (req: Request, res: Response) => {
  await listRoleController.execute(req, res);
});

roleRoutes.delete("/delete/:id/", async (req: Request, res: Response) => {
  await deleteRoleController.execute(req, res);
});

roleRoutes.put("/update/:id/", async (req: Request, res: Response) => {
  await updateRoleController.execute(req, res);
});

// Role export router
export default roleRoutes;
