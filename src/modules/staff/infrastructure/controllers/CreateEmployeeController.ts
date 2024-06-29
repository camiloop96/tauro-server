/**
 * @file CreateEmployeeController.ts
 * @description Defines the CreateEmployeeController class responsible for handling the creation of employees via HTTP requests.
 */

import {
  CreateEmployeeUseCase,
  ICreateEmployeeUseCase,
} from "@modules/staff/application/useCases/employee/CreateEmployeeUseCase";
import { MongoEmployeeRepository } from "../repositories/MongoEmployeeRepository";
import { MongoSellerRepository } from "../repositories/MongoSellerRepository";
import { MongoBranchStoreRepository } from "@modules/store/infraestructure/repositories/MongoBranchStoreRepository";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";

/**
 * Controller class for handling the creation of employees.
 */
export class CreateEmployeeController {
  private readonly createEmployeeUseCase: ICreateEmployeeUseCase;

  /**
   * Creates an instance of CreateEmployeeController.
   */
  constructor() {
    this.createEmployeeUseCase = new CreateEmployeeUseCase(
      new MongoEmployeeRepository(),
      new MongoSellerRepository(),
      new MongoBranchStoreRepository()
    );
  }

  /**
   * Handles the creation of an employee.
   *
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<Response>} A promise that resolves to the HTTP response object.
   * @throws {AppError} Throws an application-specific error if the creation fails.
   */
  async execute(req: Request, res: Response): Promise<Response> {
    logSuccess(`POST simora/api/dashboard/staff/employee/create/`);
    try {
      // Destructuring request
      const { name, lastName, DNI, branchStore, position } = req.body || {};

      // Execute function
      await this.createEmployeeUseCase.execute({
        name,
        lastName,
        DNI,
        branchStore,
        position,
      });

      // Response
      return res.status(201).json({
        message: "Employee created successfully",
        status: 201,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error creating employee: ${error.message}`);
        return res.status(500).json({
          message: `Error creating employee: ${error.message}`,
        });
      }
    }
  }
}

export default new CreateEmployeeController();
