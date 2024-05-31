import {
  CreateBranchStoreUseCase,
  ICreateBranchStoreUseCase,
} from "@modules/store/application/useCases/CreateBranchStoreUseCase";
import { MongoBranchStoreRepository } from "../repositories/MongoBranchStoreRepository";
import { Request, Response } from "express";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import { AppError } from "@shared/errors/AppError";

export class CreateBranchStoreController {
  private readonly createBranchStoreUseCase: ICreateBranchStoreUseCase;
  constructor() {
    this.createBranchStoreUseCase = new CreateBranchStoreUseCase(
      new MongoBranchStoreRepository()
    );
  }

  async execute(req: Request, res: Response) {
    logSuccess(`POST simora/api/dashboard/store/branch/create/`);
    try {
      const { name, state, city } = req.body || {};

      await this.createBranchStoreUseCase.execute({ name, state, city });

      return res.status(201).json({
        message: "Branch Store created successfully",
        status: 201,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error creating Branch Store: ${error.message}`);
        return res.status(500).json({
          message: `Error creating Branch Store: ${error.message}`,
        });
      }
    }
  }
}
