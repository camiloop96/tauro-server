// Modules

import { Request, Response, Router } from "express";
import { CreateEmployeeController } from "../controllers/CreateEmployeeController";

// Employee routes instance router
const employeeRoutes = Router();

// Create Employee controller instances
const createemployeeController = new CreateEmployeeController();

// Routes
employeeRoutes.post("/create/", async (req: Request, res: Response) => {
  await createemployeeController.execute(req, res);
});
