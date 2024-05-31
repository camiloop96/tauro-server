import { MongoBranchStoreRepository } from "../repositories/MongoBranchStoreRepository";
import { Request, Response } from "express";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import { AppError } from "@shared/errors/AppError";
import {
  DetailBranchStoreUseCase,
  IDetailBranchStoreUseCase,
} from "@modules/store/application/useCases/DetailBranchStoreUseCase";

export class DetailBranchStoreController {
  private readonly detailBranchStoreUseCase: IDetailBranchStoreUseCase;
  constructor() {
    this.detailBranchStoreUseCase = new DetailBranchStoreUseCase(
      new MongoBranchStoreRepository()
    );
  }

  async execute(req: Request, res: Response) {
    logSuccess(`GET simora/api/dashboard/store/branch/detail/${req.params.id}`);
    try {
      const { id } = req.params || {};

      const branchStoreDetail = await this.detailBranchStoreUseCase.execute(id);

      return res.status(200).json(branchStoreDetail);
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error obtaining Branch Store detail: ${error.message}`);
        return res.status(500).json({
          message: `Error obtaining Branch Store detail: ${error.message}`,
        });
      }
    }
  }
}
