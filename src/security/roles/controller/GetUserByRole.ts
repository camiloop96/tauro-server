import { Request, Response } from "express";
import { IUser } from "../../users/types/IUser";
import UserModel from "../../users/models/UserModel";

export const GetUsersByRole = async (req: Request, res: Response) => {
  try {
    const roleId: string = req.params.roleId;
    if (!roleId) {
      return res
        .status(400)
        .json({ message: "Se requiere roleId en los parámetros" });
    }

    const users: IUser[] = await UserModel.find({
      roles: roleId,
    }).select("firstName lastName position");
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
