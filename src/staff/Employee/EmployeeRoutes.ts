import { Router } from "express";
import { CreateEmployee } from "./controllers/CreateEmployee";

const EmployeeRoutes = Router();

EmployeeRoutes.post("/create/", CreateEmployee);

export default EmployeeRoutes;
