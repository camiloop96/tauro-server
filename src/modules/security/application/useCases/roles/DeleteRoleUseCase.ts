import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import { AppError } from "@shared/errors/AppError";

export interface IDeleteRoleUseCase {
  execute(id: string): Promise<void>;
}

export class DeleteRoleUseCase implements IDeleteRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(id: string): Promise<void> {
    // Check and parse ID
    const parseID = await this.roleRepository.checkAndParseID(id);

    // Role is Exist
    const roleIsExist = await this.roleRepository.roleIsExist(parseID);
    if (!roleIsExist) {
      throw new AppError("Role not found", 404);
    }

    // Delete Role
    await this.roleRepository.deleteRole(parseID);
  }
}
