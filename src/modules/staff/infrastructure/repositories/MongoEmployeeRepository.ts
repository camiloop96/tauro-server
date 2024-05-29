import { Employee } from "@modules/staff/domain/entities/Employee";
import { IEmployeeRepository } from "@modules/staff/domain/repositories/IEmployeeRepository";
import { Types, isValidObjectId } from "mongoose";
import { AppError } from "src/shared/errors/AppError";
import { EmployeeModel } from "../models/EmployeeModel";

export class MongoEmployeeRepository implements IEmployeeRepository {
  async employeeExist(id: Types.ObjectId): Promise<boolean> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Invalid or missing ID", 400);
      }
      let existingEmployee = await EmployeeModel.findById(id);
      if (existingEmployee) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new AppError("Error fetching employee", 500);
    }
  }
  async getEmployeeById(id: Types.ObjectId): Promise<Types.ObjectId> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Invalid or missing id", 400);
      }
      let existingEmployee = await EmployeeModel.findById(id);
      if (!existingEmployee) {
        throw new AppError("Employee not found", 404);
      }
      return existingEmployee._id;
    } catch (error) {
      throw new AppError("Error fetching employee", 500);
    }
  }
  async createEmployee(employee: Employee): Promise<void> {
    try {
      if (!employee.name || employee.name.length === 0) {
        throw new AppError("Name is required", 400);
      }
      if (!employee.lastName || employee.lastName.length === 0) {
        throw new AppError("Lastname is required", 400);
      }
      if (!employee.DNI) {
        throw new AppError("DNI is required", 400);
      } else if (isNaN(employee.DNI)) {
        throw new AppError("DNI must be valid number", 400);
      }
      if (!employee.branchStore || !isValidObjectId(employee.branchStore)) {
        throw new AppError("Invalid or missing Branch Store ID", 400);
      }
      let existingEmployee = await EmployeeModel.findOne({
        DNI: employee.DNI,
      });

      if (existingEmployee) {
        throw new AppError("User is already exist", 400);
      }
      let newEmployee = new EmployeeModel(employee);
      await newEmployee.save();
    } catch (error) {
      throw new AppError("Error creating employee", 500);
    }
  }
}
