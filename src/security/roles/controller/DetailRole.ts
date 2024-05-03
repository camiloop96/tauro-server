import { Request, Response } from "express";
import RoleModel, { IRole } from "../models/RolesModel";

export const DetailRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificación de existencia del campo id en el request
    if (!id) {
      return res.status(400).json({
        error: "Falta el id del rol",
      });
    }

    // Busqueda del rol
    const role: IRole | null = await RoleModel.findById(id);

    // Verificación de existencia del rol en la db
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    //Respuesta
    res.status(200).json(role);
  } catch (error) {
    console.error("Error al obtener detalle del rol:", error);
    res.status(500).json({
      message: "Error interno del servidor al obtener detalle del rol",
    });
  }
};
