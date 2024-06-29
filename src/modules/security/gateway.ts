// Routes Security Gateway
import { Router } from "express";
import roleRoutes from "./infrastructure/routes/roleRoutes";
import userRoutes from "./infrastructure/routes/userRoutes";
import authenticationRoutes from "./infrastructure/routes/authenticationRoutes";

// User routes instance router
const securityRoutes = Router();

// Routes
securityRoutes.use("/roles/", roleRoutes);
securityRoutes.use("/user/", userRoutes);
securityRoutes.use("/authentication/", authenticationRoutes);

// User export router
export default securityRoutes;
