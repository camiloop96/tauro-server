import { IUserRepository } from "@modules/security/domain/repositories/IUserRepository";

export interface IListUserUseCase {
  execute(): Promise<void>;
}

export class ListUserUseCase implements IListUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<void> {
    await this.userRepository.getList();
  }
}
