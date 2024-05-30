import {
  IUpdateRoleUseCase,
  UpdateRoleUseCase,
} from "@modules/security/application/useCases/roles/UpdateRoleUseCase";
import { MongoRoleRepository } from "../../repositories/MongoRoleRepository";
import { Request, Response } from "express";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import { AppError } from "@shared/errors/AppError";

export class UpdateRoleController {
  private readonly updateRoleUseCase: IUpdateRoleUseCase;
  constructor() {
    this.updateRoleUseCase = new UpdateRoleUseCase(new MongoRoleRepository());
  }

  async execute(req: Request, res: Response) {
    logSuccess(
      `PUT simora/api/dashboard/security/role/update/${req.params.id}/`
    );
    try {
      // Destructing request
      let { id } = req.params;
      let payload = req.body;

      // Updating role
      await this.updateRoleUseCase.execute(id, payload);

      // Return response
      return res.status(200).json({
        message: `Role updated successfully`,
        status: 200,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error updating role: ${error}`);
        return res.status(500).json({
          message: `Error updating role: ${error}`,
        });
      }
    }
  }
}
