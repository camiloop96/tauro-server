import {
  DeleteRoleUseCase,
  IDeleteRoleUseCase,
} from "@modules/security/application/useCases/roles/DeleteRoleUseCase";
import { MongoRoleRepository } from "../../repositories/MongoRoleRepository";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import { Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

export class DeleteRoleController {
  // Property initialization
  private readonly deleteRoleUseCase: IDeleteRoleUseCase;

  // Constructor
  constructor() {
    this.deleteRoleUseCase = new DeleteRoleUseCase(new MongoRoleRepository());
  }

  // Function excecute
  async execute(req: Request, res: Response) {
    logSuccess(
      `DELETE simora/api/dashboard/security/role/delete/${req.params.id}/`
    );
    try {
      // Request destructing
      const { id } = req.params || {};

      // Delete role
      await this.deleteRoleUseCase.execute(id);

      // Return response
      return res.status(200).json({
        message: `Role delete successfuly`,
        status: 200,
      });
    } catch (error: any) {
      // Error handle
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error deleting role: ${error}`);
        return res.status(500).json({
          message: `Error deleting role: ${error}`,
        });
      }
    }
  }
}
