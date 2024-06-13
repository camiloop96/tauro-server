import {
  IVerifyUseCase,
  VerifyTokenUseCase,
} from "@modules/security/application/useCases/authentication/VerifyTokenUseCase";
import { JWTAuthenticationRepository } from "../../repositories/JWTAuthenticationRepository";
import { Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";

export class VerifyTokenController {
  private readonly verifyTokenUseCase: IVerifyUseCase;
  constructor() {
    this.verifyTokenUseCase = new VerifyTokenUseCase(
      new JWTAuthenticationRepository()
    );
  }

  async execute(req: Request, res: Response) {
    logSuccess(
      `POST simora/api/dashboard/security/authentication/token/verify/`
    );
    try {
      const { token } = req.body || {};
      const verifyTokenResponse = await this.verifyTokenUseCase.execute(token);
      return res.status(200).json({
        isValid: verifyTokenResponse,
        status: 200,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error verifing token: ${error.message}`);
        res.status(500).send(`Error verifing token: ${error.message}`);
      }
    }
  }
}
