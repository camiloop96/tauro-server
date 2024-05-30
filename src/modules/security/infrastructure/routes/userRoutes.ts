// Modules
import { Request, Response, Router } from "express";
import { ListUserController } from "../controllers/user/ListUserController";
import { CreateUserController } from "../controllers/user/CreateUserController";

// User routes instance router
const userRoutes = Router();

// Create user controller instances
const createUserController = new CreateUserController();
const listUserController = new ListUserController();

userRoutes.post("/create/", async (req: Request, res: Response) => {
  await createUserController.execute(req, res);
});
userRoutes.get("/all/", async (req: Request, res: Response) => {
  await listUserController.execute(req, res);
});
// UserRoutes.delete("/delete/:id/", DeleteUserById);
// UserRoutes.put("/edit/:id", UpdateUser);
// UserRoutes.get("/detail/:id/", DetailUser);
// UserRoutes.post("/data/by-token", GetUserData);

// User export router
export default userRoutes;
