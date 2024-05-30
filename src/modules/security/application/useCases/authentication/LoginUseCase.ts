import { ICredentialsRepository } from "@modules/security/domain/repositories/ICredentialRepository";
import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import { IUserRepository } from "@modules/security/domain/repositories/IUserRepository";
import { compareHashPassword } from "@modules/security/shared/passwordManager";
import { createToken } from "@modules/security/shared/tokenManager";
import { AppError } from "@shared/errors/AppError";

export interface ILoginUseCase {
  execute(credential: ILoginRequest): Promise<void>;
}

interface ILoginRequest {
  username: string;
  password: string;
}

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly credentialRepository: ICredentialsRepository,
    private readonly userRepository: IUserRepository,
    private readonly roleRepository: IRoleRepository
  ) {}

  async execute(credentials: ILoginRequest) {
    try {
      // Destructing credentials
      const { username, password } = credentials || {};

      // Check if username exist
      const existCredential =
        await this.credentialRepository.getCredentialsByUsername(username);

      // Get user by credential
      const findUser = await this.userRepository.getUserByCredential(
        existCredential?._id
      );

      // Compare hash password
      const comparePassword = await compareHashPassword(
        password,
        existCredential.password
      );
      if (!comparePassword) {
        throw new AppError("Invalid credentials", 401);
      }

      // Create token
      const payload = { userId: findUser._id, role: findUser.role };
      const token = createToken(payload);

      // Get role name
      let roleName;
      if (findUser !== undefined) {
        roleName = await this.roleRepository.getRoleByUserId(findUser._id);
      }
    } catch (error) {
      throw new AppError("Error login", 400);
    }
  }
}
