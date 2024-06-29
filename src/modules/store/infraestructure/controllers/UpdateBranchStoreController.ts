import { MongoBranchStoreRepository } from "../repositories/MongoBranchStoreRepository";
import { Request, Response } from "express";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import { AppError } from "@shared/errors/AppError";
import {
  IUpdateBranchStoreUseCase,
  UpdateBranchStoreUseCase,
} from "@modules/store/application/useCases/UpdateBranchStoreUseCase";

export class UpdateBranchStoreController {
  private readonly updateBranchStoreUseCase: IUpdateBranchStoreUseCase;
  constructor() {
    this.updateBranchStoreUseCase = new UpdateBranchStoreUseCase(
      new MongoBranchStoreRepository()
    );
  }

  async execute(req: Request, res: Response) {
    logSuccess(`PUT simora/api/dashboard/store/branch/update/${req.params.id}`);
    try {
      const { id } = req.params || {};
      const { name, state, city } = req.body;

      await this.updateBranchStoreUseCase.execute(id, { name, state, city });

      return res.status(200).json({
        message: "Branch Store updated successfully",
        status: 200,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error updated Branch Store: ${error.message}`);
        return res.status(500).json({
          message: `Error updated Branch Store: ${error.message}`,
        });
      }
    }
  }
}
