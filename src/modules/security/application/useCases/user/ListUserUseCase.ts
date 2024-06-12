import { User } from "@modules/security/domain/entities/User";
import { IUserRepository } from "@modules/security/domain/repositories/IUserRepository";

export interface IListUserUseCase {
  execute(): Promise<User[]>;
}

export class ListUserUseCase implements IListUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getList();
  }
}
