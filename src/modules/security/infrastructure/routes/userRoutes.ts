// Modules
import { Request, Response, Router } from "express";
import { ListUserController } from "../controllers/user/ListUserController";
import { CreateUserController } from "../controllers/user/CreateUserController";
import { GetUserDataController } from "../controllers/user/GetUserDataController";

// User routes instance router
const userRoutes = Router();

// Create user controller instances
const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const getUserDataController = new GetUserDataController();

// Routes
userRoutes.post("/create/", async (req: Request, res: Response) => {
  await createUserController.execute(req, res);
});
userRoutes.get("/list/", async (req: Request, res: Response) => {
  await listUserController.execute(req, res);
});
userRoutes.post("/data/by-token/", async (req: Request, res: Response) => {
  await getUserDataController.execute(req, res);
});
// UserRoutes.delete("/delete/:id/", DeleteUserById);
// UserRoutes.put("/edit/:id", UpdateUser);
// UserRoutes.get("/detail/:id/", DetailUser);
// UserRoutes.post("/data/by-token", GetUserData);

// User export router
export default userRoutes;
