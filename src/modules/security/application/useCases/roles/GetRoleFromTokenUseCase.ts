import { Role } from "@modules/security/domain/entities/Role";
import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import { IUserRepository } from "@modules/security/domain/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

export interface IGetRoleFromTokenUseCase {
  execute(token: string): Promise<void>;
}

export class GetRoleFromTokenUseCase implements IGetRoleFromTokenUseCase {
  constructor(
    private readonly roleRepository: IRoleRepository,
    private readonly userRepository: IUserRepository
  ) {}
  async execute(token: string): Promise<void> {
    try {
      // Decode token and obtain userID
      const userID = await this.userRepository.getUserByToken(token);

      // Search userId in role list
      await this.roleRepository.getRoleByUserId(userID);
    } catch (error) {
      throw new AppError("Error obtaining role from token", 400);
    }
  }
}
