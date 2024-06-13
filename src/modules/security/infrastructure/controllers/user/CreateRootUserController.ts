import { MongoUserRepository } from "../../repositories/MongoUserRepository";

import { MongoEmployeeRepository } from "@modules/staff/infrastructure/repositories/MongoEmployeeRepository";
import { MongoRoleRepository } from "../../repositories/MongoRoleRepository";
import { MongoCredentialRepository } from "../../repositories/MongoCredentialRepository";
import { MongoBranchStoreRepository } from "@modules/store/infraestructure/repositories/MongoBranchStoreRepository";
import {
  CreateRootUserUseCase,
  ICreateRootUserUseCase,
} from "@modules/security/application/useCases/user/CreateRootUserUseCase";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";

export class CreateRootUserController {
  private readonly createRootUserUseCase: ICreateRootUserUseCase;
  constructor() {
    this.createRootUserUseCase = new CreateRootUserUseCase(
      new MongoUserRepository(),
      new MongoEmployeeRepository(),
      new MongoCredentialRepository(),
      new MongoRoleRepository(),
      new MongoBranchStoreRepository()
    );
  }

  async execute(): Promise<void> {
    try {
      await this.createRootUserUseCase.execute();
      logSuccess("Root user initialized successfully");
    } catch (error: any) {
      logError(`Error creating user: ${error.message}`);
    }
  }
}

export default new CreateRootUserController();
