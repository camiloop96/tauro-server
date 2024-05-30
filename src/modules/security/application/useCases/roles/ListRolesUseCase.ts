import { Role } from "@modules/security/domain/entities/Role";
import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import { AppError } from "@shared/errors/AppError";

export interface IListRolesUseCase {
  execute(): Promise<Role[]>;
}

export class ListRolesUseCase implements IListRolesUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(): Promise<Role[]> {
    // Obtain role list
    return this.roleRepository.getRoleList();
  }
}
