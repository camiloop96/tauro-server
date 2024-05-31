import { Request, Response } from "express";
import { MongoRoleRepository } from "../../repositories/MongoRoleRepository";
import {
  CreateRoleUseCase,
  ICreateRoleUseCase,
} from "@modules/security/application/useCases/roles/CreateRoleUseCase";
import { AppError } from "@shared/errors/AppError";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";

export class CreateRoleController {
  private readonly createRoleUseCase: ICreateRoleUseCase;
  constructor() {
    this.createRoleUseCase = new CreateRoleUseCase(new MongoRoleRepository());
  }

  async execute(req: Request, res: Response): Promise<void> {
    logSuccess(`POST simora/api/dashboard/security/role/create/`);
    try {
      const { name, description } = req.body;
      await this.createRoleUseCase.execute({
        name,
        description,
      });
      res
        .status(201)
        .send({ message: "Role created successfully", status: 201 });
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error creating role: ${error.message}`);
        res.status(500).send(`Error creating role: ${error.message}`);
      }
    }
  }
}

export default new CreateRoleController();
