import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { IUser } from "../types/IUser";

export const DetailUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "ID del usuario no proporcionado en la solicitud" });
    }

    const user: IUser | null = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error.message });
  }
};
