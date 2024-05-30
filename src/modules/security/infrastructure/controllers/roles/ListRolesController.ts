import {
  IListRolesUseCase,
  ListRolesUseCase,
} from "@modules/security/application/useCases/roles/ListRolesUseCase";
import { MongoRoleRepository } from "../../repositories/MongoRoleRepository";
import { Request, Response } from "express";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";

export class ListRolesController {
  private readonly listRolesUseCase: IListRolesUseCase;
  constructor() {
    this.listRolesUseCase = new ListRolesUseCase(new MongoRoleRepository());
  }
  async execute(req: Request, res: Response) {
    logSuccess(`GET simora/api/dashboard/security/role/list/`);
    try {
      // Obtaining role list
      const roles = await this.listRolesUseCase.execute();

      // Return role list
      res.status(200).json(roles);
    } catch (error) {
      // Error handle
      logError(`Error obtaining role list: ${error}`);
      return res.status(500).json({
        message: "Error obtaining role list",
      });
    }
  }
}
