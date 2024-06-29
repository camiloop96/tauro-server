import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import { AppError } from "@shared/errors/AppError";

export interface ICreateRoleUseCase {
  execute(roleData: IRoleRequest): Promise<void>;
}

interface IRoleRequest {
  name: string;
  description: string;
}

export class CreateRoleUseCase implements ICreateRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(roleData: IRoleRequest): Promise<void> {
    // Destructing role data
    const { name, description } = roleData || {};

    // Exist Role
    let roleIsExist = await this.roleRepository.getRoleByName(name);
    if (roleIsExist) {
      throw new AppError("Role is already exist", 400);
    }

    // Create role
    await this.roleRepository.createRole({ name, description });
  }
}
