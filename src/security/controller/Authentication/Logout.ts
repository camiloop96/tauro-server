import { Request, Response } from "express";

export const LogoutController = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
