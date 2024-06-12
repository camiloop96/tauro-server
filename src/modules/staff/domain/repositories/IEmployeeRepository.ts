import { Types } from "mongoose";
import { Employee } from "../entities/Employee";
import { Document } from "mongoose";

export interface IEmployeeRepository {
  createEmployee(employee: Employee): Promise<Document>;
  getEmployeeById(id: Types.ObjectId): Promise<Types.ObjectId>;
  employeeExist(id: number): Promise<boolean>;
  saveEmployee(employee: Document): Promise<void>;
  employeeExistByDNI(DNI: number): Promise<boolean>;
}
