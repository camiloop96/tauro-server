/**
 * @file employeeRoutes.ts
 * @description Defines routes for employee-related operations, including creating an employee.
 */

// Modules
import { Request, Response, Router } from "express";
import { CreateEmployeeController } from "../controllers/CreateEmployeeController";

// Employee routes instance router
const employeeRoutes = Router();

// Create Employee controller instances
const createEmployeeController = new CreateEmployeeController();

/**
 * Route for creating a new employee.
 * @route POST /create/
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
employeeRoutes.post(
  "/create/",
  async (req: Request, res: Response): Promise<void> => {
    await createEmployeeController.execute(req, res);
  }
);

// Export
export default employeeRoutes;
