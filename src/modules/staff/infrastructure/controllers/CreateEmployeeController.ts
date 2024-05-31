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

export class CreateEmployeeController {
  private readonly createEmployeeUseCase: ICreateEmployeeUseCase;
  constructor() {
    this.createEmployeeUseCase = new CreateEmployeeUseCase(
      new MongoEmployeeRepository(),
      new MongoSellerRepository(),
      new MongoBranchStoreRepository()
    );
  }

  async execute(req: Request, res: Response) {
    logSuccess(`POST simora/api/dashboard/staff/employee/create/`);
    try {
      // Destructing request
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
      } else {
        logError(`Error creating employee: ${error.message}`);
        return res.status(500).json({
          message: `Error creating employee: ${error.message}`,
        });
      }
    }
  }
}
