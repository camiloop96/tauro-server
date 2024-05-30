import { Request, Response } from "express";
import { MongoUserRepository } from "../../repositories/MongoUserRepository";
import {
  IListUserUseCase,
  ListUserUseCase,
} from "@modules/security/application/useCases/user/ListUserUseCase";

export class ListUserController {
  private readonly listUserUseCase: IListUserUseCase;
  constructor() {
    this.listUserUseCase = new ListUserUseCase(new MongoUserRepository());
  }

  async execute(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.listUserUseCase.execute();
      res.status(200).send(users);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  }
}

export default new ListUserController();
