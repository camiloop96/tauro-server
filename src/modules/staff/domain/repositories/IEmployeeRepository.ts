import { Types } from "mongoose";
import { Employee } from "../entities/Employee";

export interface IEmployeeRepository {
  createEmployee(employee: Employee): Promise<void>;
  getEmployeeById(id: Types.ObjectId): Promise<Types.ObjectId>;
  employeeExist(id: Types.ObjectId): Promise<boolean>;
}
