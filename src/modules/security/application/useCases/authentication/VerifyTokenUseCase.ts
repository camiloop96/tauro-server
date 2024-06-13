import { IAuthenticationRepository } from "@modules/security/domain/repositories/IAuthenticationRepository";
import { ICredentialsRepository } from "@modules/security/domain/repositories/ICredentialRepository";

export interface IVerifyUseCase {
  execute(token: string): Promise<boolean>;
}

export class VerifyTokenUseCase implements IVerifyUseCase {
  constructor(private readonly jwtAuthRepository: IAuthenticationRepository) {}

  async execute(token: string): Promise<boolean> {
    const verifyToken = await this.jwtAuthRepository.verifyToken(token);
    if (verifyToken === true) {
      return true;
    } else {
      return false;
    }
  }
}
