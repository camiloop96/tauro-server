// Routes Staff Gateway
import { Router } from "express";
import employeeRoutes from "./infrastructure/routes/employeeRoutes";

// User routes instance router
const staffRoutes = Router();

// Routes
staffRoutes.use("/employee/", employeeRoutes);

// User export router
export default staffRoutes;
