// Routes Security Gateway
import { Router } from "express";
import roleRoutes from "./infrastructure/routes/roleRoutes";

// User routes instance router
const securityRoutes = Router();

// Routes
securityRoutes.use("/roles/", roleRoutes);

// User export router
export default securityRoutes;
