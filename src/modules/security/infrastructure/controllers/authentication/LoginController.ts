import {
  ILoginUseCase,
  LoginUseCase,
} from "@modules/security/application/useCases/authentication/LoginUseCase";
import { JWTAuthenticationRepository } from "../../repositories/JWTAuthenticationRepository";
import { MongoCredentialRepository } from "../../repositories/MongoCredentialRepository";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import { MongoRoleRepository } from "../../repositories/MongoRoleRepository";
import { Request, Response } from "express";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import { AppError } from "@shared/errors/AppError";

export class LoginController {
  private readonly loginUseCase: ILoginUseCase;
  constructor() {
    this.loginUseCase = new LoginUseCase(
      new MongoCredentialRepository(),
      new MongoUserRepository(),
      new MongoRoleRepository(),
      new JWTAuthenticationRepository()
    );
  }

  async execute(req: Request, res: Response) {
    logSuccess(`POST simora/api/dashboard/security/authentication/login/`);
    try {
      let { username, password } = req.body || {};

      let loginResponse = await this.loginUseCase.execute({
        username,
        password,
      });

      return res.status(200).json(loginResponse);
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error login: ${error.message}`);
        res.status(500).send(`Error login: ${error.message}`);
      }
    }
  }
}
