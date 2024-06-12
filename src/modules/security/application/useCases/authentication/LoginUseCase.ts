import {
  IAuthenticationRepository,
  ILoginRequest,
  ILoginResponse,
} from "@modules/security/domain/repositories/IAuthenticationRepository";
import { ICredentialsRepository } from "@modules/security/domain/repositories/ICredentialRepository";
import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import { IUserRepository } from "@modules/security/domain/repositories/IUserRepository";
import { compareHashPassword } from "@modules/security/shared/passwordManager";
import { AppError } from "@shared/errors/AppError";

export interface ILoginUseCase {
  execute(credential: ILoginRequest): Promise<ILoginResponse>;
}

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly credentialRepository: ICredentialsRepository,
    private readonly userRepository: IUserRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly authenticationRepository: IAuthenticationRepository
  ) {}

  async execute(credentials: ILoginRequest): Promise<ILoginResponse> {
    // Destructing credentials
    const { username, password } = credentials || {};

    // Check if username exist
    const existCredential =
      await this.credentialRepository.getCredentialsByUsername(username);

    console.log(existCredential);

    // Get user by credential
    const findUser = await this.userRepository.getUserByCredential(
      existCredential?._id
    );

    console.log(findUser);
    
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
    const token = await this.authenticationRepository.createToken(payload);

    if (!token) {
      throw new AppError("Token generation failed", 500);
    }
    // Get role name
    let roleName = await this.roleRepository.getRoleByUserId(findUser._id);

    if (!roleName) {
      throw new AppError("Role not found", 404);
    }

    return {
      token: token,
      role: roleName,
    };
  }
}
