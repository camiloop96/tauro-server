import { Request, Response } from "express";
import RoleModel, { IRole } from "../models/RolesModel";

export const DeleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificación de existencia del id en el request
    if (!id) {
      return res.status(400).json({
        error: "Falta el id de rol",
      });
    }

    // Eliminación del documento
    const deletedRole: IRole | null = await RoleModel.findByIdAndDelete(id);

    // Verificación de existencia del rol en la db
    if (!deletedRole) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    // Respuesta
    res.status(200).json({ message: "Rol eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el rol:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor al eliminar el rol" });
  }
};
