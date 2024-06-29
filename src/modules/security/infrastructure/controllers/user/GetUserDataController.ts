/**
 * @file GetUserDataController.ts
 * @description Controller responsible for handling requests to fetch user data by token.
 */

import { Request, Response } from "express";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import { AppError } from "@shared/errors/AppError";
import {
  GetUserDataUseCase,
  IGetUserDataUseCase,
} from "@modules/security/application/useCases/user/GetUserDataUseCase";
import { MongoEmployeeRepository } from "@modules/staff/infrastructure/repositories/MongoEmployeeRepository";
import { MongoBranchStoreRepository } from "@modules/store/infraestructure/repositories/MongoBranchStoreRepository";
import { MongoSellerRepository } from "@modules/staff/infrastructure/repositories/MongoSellerRepository";

/**
 * Controller class handling requests to fetch user data by token.
 */
export class GetUserDataController {
  private readonly getUserDataUseCase: IGetUserDataUseCase;

  /**
   * Creates an instance of GetUserDataController.
   */
  constructor() {
    this.getUserDataUseCase = new GetUserDataUseCase(
      new MongoUserRepository(),
      new MongoEmployeeRepository(),
      new MongoBranchStoreRepository(),
      new MongoSellerRepository()
    );
  }

  /**
   * Executes the request to fetch user data by token.
   *
   * @param {Request} req - The Express Request object.
   * @param {Response} res - The Express Response object.
   * @returns {Promise<void>} A promise that resolves when the request is handled.
   */
  async execute(req: Request, res: Response): Promise<void> {
    logSuccess(`POST simora/api/dashboard/security/user/data/by-token/`);
    const { token } = req.body || {};
    try {
      const userData = await this.getUserDataUseCase.execute(token);
      res.status(200).json(userData);
    } catch (error: any) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error fetching user data: ${error}`);
        res.status(500).json({ message: `Error fetching user data: ${error}` });
      }
    }
  }
}

// Export a singleton instance of the controller
export default new GetUserDataController();
