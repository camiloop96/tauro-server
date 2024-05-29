import { Request, Response } from "express";
import { MongoRoleRepository } from "../../repositories/MongoRoleRepository";
import {
  CreateRoleUseCase,
  ICreateRoleUseCase,
} from "@modules/security/application/useCases/roles/CreateRoleUseCase";

export class CreateRoleController {
  private readonly createRoleUseCase: ICreateRoleUseCase;
  constructor() {
    this.createRoleUseCase = new CreateRoleUseCase(new MongoRoleRepository());
  }

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;
      await this.createRoleUseCase.execute({
        name,
        description,
      });
      res.status(201).send("Role created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Error creating user");
    }
  }
}

export default new CreateRoleController();
