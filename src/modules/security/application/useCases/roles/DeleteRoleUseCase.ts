import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import { AppError } from "@shared/errors/AppError";
import { Types } from "mongoose";

interface IDeleteRoleUseCase {
  execute(id: Types.ObjectId): Promise<void>;
}

export class DeleteRoleUseCase implements IDeleteRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(id: Types.ObjectId): Promise<void> {
    try {
      // Role is Exist
      const roleIsExist = await this.roleRepository.roleIsExist(id);
      if (!roleIsExist) {
        throw new AppError("Role not found", 404);
      }

      // Delete Role
      await this.roleRepository.deleteRole(id);
    } catch (error) {
      throw new Error("Error deleting roles");
    }
  }
}
