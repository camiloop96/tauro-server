/**
 * @file staffGateway.ts
 * @description Aggregates all staff-related routes, including employee routes, and defines the base path for these routes.
 */

// Modules
import { Router } from "express";
import employeeRoutes from "./infrastructure/routes/employeeRoutes";

// Staff routes instance router
const staffRoutes = Router();

/**
 * Base route for employee-related operations.
 * @route /employee/
 */
staffRoutes.use("/employee/", employeeRoutes);

// Export the staff routes
export default staffRoutes;
