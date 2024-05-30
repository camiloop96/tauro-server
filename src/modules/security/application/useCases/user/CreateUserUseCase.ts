import { ICredentialsRepository } from "@modules/security/domain/repositories/ICredentialRepository";
import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import { IUserRepository } from "@modules/security/domain/repositories/IUserRepository";
import UserModel from "@modules/security/infrastructure/models/UserModel";
import { IEmployeeRepository } from "@modules/staff/domain/repositories/IEmployeeRepository";
import { Types } from "mongoose";
import { AppError } from "src/shared/errors/AppError";

export interface ICreateUserUseCase {
  execute(userData: IUserRequest): Promise<void>;
}

interface IUserRequest {
  employee: Types.ObjectId;
  username: string;
  password: string;
  role: string;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly employeeRepository: IEmployeeRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly credentialsRepository: ICredentialsRepository
  ) {}

  async execute(userData: IUserRequest): Promise<void> {
    try {
      // Existing user
      const existingEmployee = await this.employeeRepository.getEmployeeById(
        userData.employee
      );

      // Existing user by employee id
      const existEmployeeUser = await this.userRepository.isExistEmployeeUser(
        existingEmployee
      );

      if (existEmployeeUser) {
        throw new AppError("The employee already has an associated user", 400);
      }

      // ExistingRole
      const existingRole = await this.roleRepository.getRoleByName(
        userData.role
      );

      // Creating credential
      const createCredential =
        await this.credentialsRepository.createCredential({
          _id: undefined,
          username: userData.username,
          password: userData.password,
        });

      // Creating user

      await this.userRepository.saveUser({
        employee: userData.employee,
        role: existingRole,
        credential: createCredential,
      });
    } catch (error) {
      throw new AppError("Error creating user", 500);
    }
  }
}
