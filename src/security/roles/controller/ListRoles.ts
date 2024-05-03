import { Request, Response } from "express";
import RoleModel, { IRole } from "../models/RolesModel";

export const ListRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles: IRole[] = await RoleModel.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error al listar roles:", error);
    res.status(500).json({ message: "Error interno del servidor al listar roles" });
  }
};
