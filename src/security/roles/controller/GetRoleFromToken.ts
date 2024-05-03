import { Request, Response } from "express";
import RoleModel, { IRole } from "../models/RolesModel";
import { JwtPayload } from "jsonwebtoken";
import UserModel from "../../users/models/UserModel";
import { IUser } from "../../users/types/IUser";
import { decodeToken } from "../../utils/tokenManager";

export const GetRoleFromToken = async (req: Request, res: Response) => {
  try {
    const token: string = req.body.token;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Token no proporcionado en la solicitud" });
    }

    const decodedToken: JwtPayload | null = await decodeToken(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const user: IUser | null = await UserModel.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    let userRole: IRole | null = await RoleModel.findById(user.role);
    if (!userRole) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    res.status(200).json({ role: userRole.name });
  } catch (error: any) {
    res.status(500).json({
      message: "Error al obtener el rol del usuario",
      error: error.message,
    });
  }
};
