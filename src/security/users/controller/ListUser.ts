import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { IUser } from "../types/IUser";

export const ListUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users: IUser[] = await UserModel.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
