import { Request, Response } from "express";
import RoleModel, { IRole } from "../models/RolesModel";

export const UpdateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Verificación de existencia del id en el request
    if (!id) {
      return res.status(400).json({
        error: "Falta el id de rol",
      });
    }

    // Verificación de existencia del campo name del rol
    if (name) {
      return res.status(400).json({
        error: "Falta campo de nombre del rol",
      });
    }

    // Actualización del rol en bases de datos
    const updatedRole: IRole | null = await RoleModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    // Verificación de existencia del rol en la db
    if (!updatedRole) {
      res.status(404).json({ message: "Rol no encontrado" });
      return;
    }

    // Respuesta
    res.status(200).json(updatedRole);
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor al actualizar el rol" });
  }
};
