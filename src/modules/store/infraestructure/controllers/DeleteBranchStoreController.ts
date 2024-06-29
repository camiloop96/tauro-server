import { MongoBranchStoreRepository } from "../repositories/MongoBranchStoreRepository";
import { Request, Response } from "express";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import { AppError } from "@shared/errors/AppError";
import {
  DeleteBranchStoreUseCase,
  IDeleteBranchStoreUseCase,
} from "@modules/store/application/useCases/DeleteBranchStoreUseCase";

export class DeleteBranchStoreController {
  private readonly deleteBranchStoreUseCase: IDeleteBranchStoreUseCase;
  constructor() {
    this.deleteBranchStoreUseCase = new DeleteBranchStoreUseCase(
      new MongoBranchStoreRepository()
    );
  }

  async execute(req: Request, res: Response) {
    logSuccess(
      `DELETE simora/api/dashboard/store/branch/delete/${req.params.id}`
    );
    try {
      const { id } = req.params || {};

      await this.deleteBranchStoreUseCase.execute(id);

      return res.status(201).json({
        message: "Branch Store deleted successfully",
        status: 200,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error deleting Branch Store: ${error.message}`);
        return res.status(500).json({
          message: `Error deleting Branch Store: ${error.message}`,
        });
      }
    }
  }
}
