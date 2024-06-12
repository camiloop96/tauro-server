// Modules

import { Request, Response, Router } from "express";
import { CreateEmployeeController } from "../controllers/CreateEmployeeController";

// Employee routes instance router
const employeeRoutes = Router();

// Create Employee controller instances
const createEmployeeController = new CreateEmployeeController();

// Routes
employeeRoutes.post("/create/", async (req: Request, res: Response) => {
  await createEmployeeController.execute(req, res);
});

// Export
export default employeeRoutes;
