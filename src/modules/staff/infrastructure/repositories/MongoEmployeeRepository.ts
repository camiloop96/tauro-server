/**
 * @file MongoEmployeeRepository.ts
 * @description Implements the IEmployeeRepository interface for interacting with Employee data in MongoDB.
 */

import { Employee } from "@modules/staff/domain/entities/Employee";
import { IEmployeeRepository } from "@modules/staff/domain/repositories/IEmployeeRepository";
import { Document, Types, isValidObjectId } from "mongoose";
import { EmployeeModel } from "../models/EmployeeModel";
import { AppError } from "@shared/errors/AppError";

/**
 * Class representing a repository for managing Employee entities in MongoDB.
 * @implements {IEmployeeRepository}
 */
export class MongoEmployeeRepository implements IEmployeeRepository {
  /**
   * Fetches the details of an employee by their ID.
   * @param id - The ObjectId of the employee.
   * @returns A promise that resolves to an Employee entity.
   * @throws {AppError} Throws an error if the ID is invalid or if the employee is not found.
   */
  async getEmployeeDetail(id: Types.ObjectId): Promise<Employee> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Invalid or missing ID", 400);
      }
      const employeeDetail = await EmployeeModel.findById(id).select("-__v");
      if (!employeeDetail) {
        throw new AppError("Employee not found", 400);
      }
      return employeeDetail;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching employee", 500);
      }
    }
  }

  /**
   * Checks if an employee exists by their DNI.
   * @param DNI - The DNI of the employee.
   * @returns A promise that resolves to a boolean indicating if the employee exists.
   * @throws {AppError} Throws an error if the DNI is not a number.
   */
  async employeeExistByDNI(DNI: number): Promise<boolean> {
    try {
      if (isNaN(DNI)) {
        throw new AppError("DNI must be number", 400);
      }
      const existEmployee = await EmployeeModel.findOne({ DNI: DNI });
      return !!existEmployee;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching employee", 500);
      }
    }
  }

  /**
   * Saves an employee document.
   * @param employee - The employee document to save.
   * @returns A promise that resolves when the employee is saved.
   * @throws {AppError} Throws an error if saving fails.
   */
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

  /**
   * Checks if an employee exists by their ID.
   * @param id - The ID of the employee.
   * @returns A promise that resolves to a boolean indicating if the employee exists.
   * @throws {AppError} Throws an error if the ID is invalid or if fetching fails.
   */
  async employeeExist(id: number): Promise<boolean> {
    try {
      if (!id || isNaN(id)) {
        throw new AppError("Invalid or missing ID", 400);
      }
      const existingEmployee = await EmployeeModel.findOne({ DNI: id });
      return !!existingEmployee;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching employee", 500);
      }
    }
  }

  /**
   * Fetches an employee by their ID.
   * @param id - The ObjectId of the employee.
   * @returns A promise that resolves to the ObjectId of the employee.
   * @throws {AppError} Throws an error if the ID is invalid or if the employee is not found.
   */
  async getEmployeeById(id: Types.ObjectId): Promise<Types.ObjectId> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Invalid or missing id", 400);
      }
      const existingEmployee = await EmployeeModel.findById(id);
      if (!existingEmployee) {
        throw new AppError("Employee not found", 404);
      }
      return existingEmployee._id;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching employee", 500);
      }
    }
  }

  /**
   * Creates a new employee.
   * @param employee - The employee entity to create.
   * @returns A promise that resolves to the created employee document.
   * @throws {AppError} Throws an error if the employee data is invalid or if the employee already exists.
   */
  async createEmployee(employee: Employee): Promise<Document> {
    try {
      const { name, lastName, DNI, branchStore } = employee || {};
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
      const existingEmployee = await EmployeeModel.findOne({ DNI: DNI });
      if (existingEmployee) {
        throw new AppError("Employee is already exist", 400);
      }
      const newEmployee = new EmployeeModel(employee);
      return newEmployee;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error creating employee", 500);
      }
    }
  }
}
