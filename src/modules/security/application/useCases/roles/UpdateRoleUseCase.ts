import { Role } from "@modules/security/domain/entities/Role";
import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import { AppError } from "@shared/errors/AppError";

export interface IUpdateRoleUseCase {
  execute(id: string, payload: Role): Promise<void>;
}

export class UpdateRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(id: string, payload: Role): Promise<void> {
    // Check and parse ID
    const parseID = await this.roleRepository.checkAndParseID(id);

    // Update Role
    await this.roleRepository.updateRole(parseID, payload);
  }
}
