import { Request, Response, Router } from "express";
import { LoginController } from "../controllers/authentication/LoginController";
import { VerifyTokenController } from "../controllers/authentication/VerifyTokenController";

// Create routes instance router
const authenticationRoutes = Router();

// Create authentication controller instances
const loginController = new LoginController();
const verifyTokenController = new VerifyTokenController();

// Routes
authenticationRoutes.post("/login/", async (req: Request, res: Response) => {
  await loginController.execute(req, res);
});
authenticationRoutes.post(
  "/token/verify",
  async (req: Request, res: Response) => {
    await verifyTokenController.execute(req, res);
  }
);
export default authenticationRoutes;
