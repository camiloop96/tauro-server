import {
  DetailRoleUseCase,
  IDetailRoleUseCase,
} from "@modules/security/application/useCases/roles/DetailRoleUseCase";
import { MongoRoleRepository } from "../../repositories/MongoRoleRepository";
import { Request, Response } from "express";
import { logError } from "@utils/LogHandle/logsMessages";
import { AppError } from "@shared/errors/AppError";

export class DetailRoleController {
  private readonly detailRoleUseCase: IDetailRoleUseCase;
  constructor() {
    this.detailRoleUseCase = new DetailRoleUseCase(new MongoRoleRepository());
  }
  async execute(req: Request, res: Response) {
    try {
      // Destructuring request
      let { id } = req.params;

      // Obtain detail
      const roleDetail = await this.detailRoleUseCase.execute(id);

      // Return detail
      return res.status(200).json(roleDetail);
    } catch (error: any) {
      // Error handle
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error obtaining role detail: ${error}`);
        return res.status(500).json({
          message: `Error obtaining role detail: ${error}`,
        });
      }
    }
  }
}
