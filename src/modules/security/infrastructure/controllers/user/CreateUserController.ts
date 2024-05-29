import { Request, Response } from "express";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import {
  CreateUserUseCase,
  ICreateUserUseCase,
} from "@modules/security/application/useCases/user/CreateUserUseCase";
import { MongoEmployeeRepository } from "@modules/staff/infrastructure/repositories/MongoEmployeeRepository";
import { MongoRoleRepository } from "../../repositories/MongoRoleRepository";
import { MongoCredentialRepository } from "../../repositories/MongoCredentialRepository";

export class CreateUserController {
  private readonly createUserUseCase: ICreateUserUseCase;
  constructor() {
    this.createUserUseCase = new CreateUserUseCase(
      new MongoUserRepository(),
      new MongoEmployeeRepository(),
      new MongoRoleRepository(),
      new MongoCredentialRepository()
    );
  }

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const { employee, username, role, password } = req.body;
      await this.createUserUseCase.execute({
        employee,
        role,
        username,
        password,
      });
      res.status(201).send("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Error creating user");
    }
  }
}

export default new CreateUserController();
