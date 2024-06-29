import {
  GetRoleFromTokenUseCase,
  IGetRoleFromTokenUseCase,
} from "@modules/security/application/useCases/roles/GetRoleFromTokenUseCase";
import { MongoRoleRepository } from "../../repositories/MongoRoleRepository";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import { Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";
import { logError } from "@utils/LogHandle/logsMessages";

export class GetRoleFromTokenController {
  private readonly getRoleFromTokenUseCase: IGetRoleFromTokenUseCase;
  constructor() {
    this.getRoleFromTokenUseCase = new GetRoleFromTokenUseCase(
      new MongoRoleRepository(),
      new MongoUserRepository()
    );
  }

  async execute(req: Request, res: Response) {
    try {
      // Destructing request
      let { token } = req.body || {};

      // Obtaining role
      const role = await this.getRoleFromTokenUseCase.execute(token);

      // Return response
      return res.status(200).json(role);
    } catch (error: any) {
      logError(`Error obtaining role: ${error}`);
      return res
        .status(500)
        .json({ message: `Error obtaining role: ${error}` });
    }
  }
}
