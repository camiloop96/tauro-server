import { Employee } from "@modules/staff/domain/entities/Employee";
import { IEmployeeRepository } from "@modules/staff/domain/repositories/IEmployeeRepository";
import { Document, Types, isValidObjectId } from "mongoose";
import { EmployeeModel } from "../models/EmployeeModel";
import { AppError } from "@shared/errors/AppError";

export class MongoEmployeeRepository implements IEmployeeRepository {
  async saveEmployee(employee: Document): Promise<void> {
    try {
      await employee.save();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error creating employee", 500);
      }
    }
  }
  async employeeExist(id: number): Promise<boolean> {
    try {
      if (!id || isNaN(id)) {
        throw new AppError("Invalid or missing ID", 400);
      }
      let existingEmployee = await EmployeeModel.findOne({ DNI: id });
      if (existingEmployee) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching employee", 500);
      }
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
    } catch (error: any) {
      if (error instanceof error) {
        throw error;
      } else {
        throw new AppError("Error fetching employee", 500);
      }
    }
  }
  async createEmployee(employee: Employee): Promise<Document> {
    try {
      // Destructure params
      const { name, lastName, DNI, branchStore, position } = employee || {};
      if (!name || name.length === 0) {
        throw new AppError("Name is required", 400);
      }
      if (!lastName || lastName.length === 0) {
        throw new AppError("Lastname is required", 400);
      }
      if (!DNI) {
        throw new AppError("DNI is required", 400);
      } else if (isNaN(DNI)) {
        throw new AppError("DNI must be valid number", 400);
      }
      if (!branchStore || !isValidObjectId(branchStore)) {
        throw new AppError("Invalid or missing Branch Store ID", 400);
      }
      let existingEmployee = await EmployeeModel.findOne({
        DNI: DNI,
      });

      if (existingEmployee) {
        throw new AppError("User is already exist", 400);
      }
      let newEmployee = new EmployeeModel(employee);
      return newEmployee;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error creating employee", 500);
      }
    }
  }
}
