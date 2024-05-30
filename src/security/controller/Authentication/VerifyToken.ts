import { Request, Response } from "express";
import { verifyToken } from "../../../modules/security/shared/tokenManager";
import { getCurrentDate } from "../../../utils/dateManager";

export const VerifyTokenController = async (req: Request, res: Response) => {
  console.log(
    `${getCurrentDate()} ${
      req.method
    } simora/api/authentication/security/token/verify/`
  );
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token no proporcionado" });
    }

    let isValid: boolean = await verifyToken(token);

    if (isValid) {
      return res.status(200).json({
        valid: true,
      });
    } else {
      return res.status(403).json({
        valid: false,
      });
    }
  } catch (error: any) {
    console.error("Error al verificar el token:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
