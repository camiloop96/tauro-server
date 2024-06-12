import { Request, Response } from "express";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import {
  IListUserUseCase,
  ListUserUseCase,
} from "@modules/security/application/useCases/user/ListUserUseCase";
import { logError } from "@utils/LogHandle/logsMessages";
import { AppError } from "@shared/errors/AppError";

export class ListUserController {
  private readonly listUserUseCase: IListUserUseCase;
  constructor() {
    this.listUserUseCase = new ListUserUseCase(new MongoUserRepository());
  }

  async execute(req: Request, res: Response) {
    try {
      const users = await this.listUserUseCase.execute();
      res.status(200).json(users);
    } catch (error: any) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
          status: error.statusCode,
        });
      } else {
        logError(`Error creating user: ${error}`);
        return res.status(500).json({ message: "Error creating user" });
      }
    }
  }
}

export default new ListUserController();
