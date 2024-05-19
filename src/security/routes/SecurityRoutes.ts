import { Router } from "express";
import { LoginController } from "../controller/Authentication/Login";
import { LogoutController } from "../controller/Authentication/Logout";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { VerifyTokenController } from "../controller/Authentication/VerifyToken";
import RolesRoutes from "../roles/routes/RolesRoutes";
import UserRoutes from "../users/UserRoutes";

// Router
const SecurityRoutes = Router();

// Authentication
SecurityRoutes.post("/authentication/login/", LoginController);
SecurityRoutes.post("/authentication/logout/", LogoutController);
SecurityRoutes.post("/authentication/token/verify/", VerifyTokenController);

// User
SecurityRoutes.use("/user/", UserRoutes);

// Roles
SecurityRoutes.use("/roles/", RolesRoutes);

export default SecurityRoutes;
