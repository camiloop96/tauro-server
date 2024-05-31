import {
  IListBranchStoreUseCase,
  ListBranchStoreUseCase,
} from "@modules/store/application/useCases/GetBranchStoreListUseCase";
import { MongoBranchStoreRepository } from "../repositories/MongoBranchStoreRepository";
import { Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";
import { logSuccess } from "@utils/LogHandle/logsMessages";

export class ListBranchStoreController {
  private readonly listBranchStoreUseCase: IListBranchStoreUseCase;
  constructor() {
    this.listBranchStoreUseCase = new ListBranchStoreUseCase(
      new MongoBranchStoreRepository()
    );
  }

  async execute(req: Request, res: Response) {
    logSuccess(`GET simora/api/dashboard/store/branch/list/`);

    try {
      const listBranchStore = await this.listBranchStoreUseCase.execute();

      return res.status(200).json(listBranchStore);
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        return res.status(500).json({
          error: `Error obtaining Branch Store list: ${error.message}`,
        });
      }
    }
  }
}
