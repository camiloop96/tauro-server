import { Request, Response } from "express";
import RoleModel, { IRole } from "../models/RolesModel";

export const CreateRole = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Verificación de existencia
    if (!name) {
      return res.status(400).json({
        error: "Falta nombre en los datos de ingreso",
      });
    }

    // Verificar si ya existe un rol con el mismo nombre
    const existingRole: IRole | null = await RoleModel.findOne({ name });
    if (existingRole) {
      res.status(409).json({ message: "El rol ya existe" });
      return;
    }

    // Crear el nuevo rol
    const role: IRole = new RoleModel({ name, description });
    await role.save();

    res.status(200).json({ message: "Rol creado con éxito" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
