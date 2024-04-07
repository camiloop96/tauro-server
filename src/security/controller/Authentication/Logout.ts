import { Request, Response } from "express";
import { getCurrentDate } from "../../../utils/dateManager";

export const LogoutController = async (req: Request, res: Response) => {
  console.log(
    `${getCurrentDate()} ${
      req.method
    } simora/api/authentication/security/authentication/login/`
  );
  try {
    return res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
