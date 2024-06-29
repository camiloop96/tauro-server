import { ICredentialsRepository } from "@modules/security/domain/repositories/ICredentialRepository";
import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import { IUserRepository } from "@modules/security/domain/repositories/IUserRepository";
import { IEmployeeRepository } from "@modules/staff/domain/repositories/IEmployeeRepository";
import { AppError } from "@shared/errors/AppError";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import { config } from "dotenv";
import * as RootConfigJSON from "@shared/rootData/UserRootData.json";
import { IBranchStoreRepository } from "@modules/store/domain/repositories/IBranchStoreRepository";
import { Types } from "mongoose";
import { BranchStore } from "@modules/store/domain/entities/BranchStore";

export interface ICreateRootUserUseCase {
  execute(): Promise<void>;
}

interface IRootEmployeeMasterData {
  name: string;
  lastName: string;
  DNI: number;
  position: string;
  branchStore: {
    name: string;
    city: string;
    state: string;
  };
}

config().parsed;

const { MASTER_USERNAME, MASTER_PASSWORD, MASTER_ROLE } = process.env || {};

export class CreateRootUserUseCase implements ICreateRootUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private employeeRepository: IEmployeeRepository,
    private credentialRepository: ICredentialsRepository,
    private roleRepository: IRoleRepository,
    private branchStoreRepository: IBranchStoreRepository,
    private usernameMaster: string | undefined = MASTER_USERNAME,
    private passwordMaster: string | undefined = MASTER_PASSWORD,
    private roleMaster: string | undefined = MASTER_ROLE
  ) {}

  async execute(): Promise<void> {
    const employeeMasterData = this.getEmployeeMasterData();
    this.checkEnvVariables();

    const createRole = await this.createRoleIfNotExist(this.roleMaster!);

    // Branch Store
    const createBranchStore = await this.createBranchStoreIfNotExist(
      employeeMasterData.branchStore
    );

    // Create Employee
    const employeeExist = await this.employeeRepository.employeeExistByDNI(
      employeeMasterData.DNI
    );

    let newEmployee;
    if (employeeExist) {
      logSuccess("Master employee is already exists");
    } else {
      newEmployee = await this.createEmployeeIfNotExist(
        employeeMasterData,
        createBranchStore
      );
      logSuccess("Master employee initialized");
      await this.createCredentialIfNotExist(
        newEmployee,
        createRole,
        this.usernameMaster!,
        this.passwordMaster!
      );

      await this.employeeRepository.saveEmployee(newEmployee!);
    }
  }

  private getEmployeeMasterData(): IRootEmployeeMasterData {
    try {
      return JSON.parse(JSON.stringify(RootConfigJSON));
    } catch (error: any) {
      throw new AppError(`Error obtaining JSON config`, 500, error);
    }
  }

  private checkEnvVariables(): void {
    if (!this.roleMaster || !this.passwordMaster || !this.usernameMaster) {
      throw new AppError("ENV variables are not defined", 400);
    }
  }

  private async createRoleIfNotExist(roleMaster: string) {
    const roleExist = await this.roleRepository.getRoleByName(roleMaster);

    if (roleExist) {
      logSuccess("Role master is already exists");
      return roleExist;
    } else {
      const newRole = await this.roleRepository.createRootRole(roleMaster);
      logSuccess("Role master initialized");
      return newRole;
    }
  }

  private async createBranchStoreIfNotExist(branchStoreData: BranchStore) {
    const branchStoreExist =
      await this.branchStoreRepository.checkIfBranchStoreExistByName(
        branchStoreData?.name
      );

    if (branchStoreExist) {
      logSuccess("Branch store is already exist");
      return;
    } else {
      const newBranchStore =
        await this.branchStoreRepository.createRootBranchStore({
          name: branchStoreData.name,
          state: branchStoreData.state,
          city: branchStoreData.city,
        });

      return newBranchStore;
    }
  }

  private async createEmployeeIfNotExist(
    employeeData: IRootEmployeeMasterData,
    branchStore: any
  ) {
    const newEmployee = await this.employeeRepository.createEmployee({
      name: employeeData.name,
      lastName: employeeData.lastName,
      DNI: employeeData.DNI,
      branchStore: branchStore._id,
      position: employeeData.position,
    });

    return newEmployee;
  }

  private async createCredentialIfNotExist(
    newEmployee: any,
    createRole: Types.ObjectId,
    usernameMaster: string,
    passwordMaster: string
  ) {
    const usernameExist = await this.credentialRepository.credentialIsExist(
      usernameMaster
    );

    if (usernameExist) {
      logSuccess("User is already exists");
    } else {
      const createCredential =
        await this.credentialRepository.createRootCredential({
          username: usernameMaster,
          password: passwordMaster,
        });

      await this.userRepository.createRootUser({
        employee: newEmployee._id,
        role: createRole,
        credential: createCredential._id,
      });
      logSuccess("Root user initialized");
    }
  }
}
