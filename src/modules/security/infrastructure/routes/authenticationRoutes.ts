import { Request, Response, Router } from "express";
import { LoginController } from "../controllers/authentication/LoginController";

// Create routes instance router
const authenticationRoutes = Router();

// Create authentication controller instances
const loginController = new LoginController();

// Routes
authenticationRoutes.post("/login/", async (req: Request, res: Response) => {
  await loginController.execute(req, res);
});

export default authenticationRoutes;
