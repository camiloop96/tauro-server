import { Role } from "@modules/security/domain/entities/Role";
import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";

export interface IDetailRoleUseCase {
  execute(id: string): Promise<Role>;
}

export class DetailRoleUseCase implements IDetailRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(id: string) {
    // Check and parse id
    let parseID = await this.roleRepository.checkAndParseID(id);
    // Detail role
    return this.roleRepository.getDetailRole(parseID);
  }
}
