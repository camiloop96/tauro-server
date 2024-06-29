import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { JWTAuthenticationRepository } from "@modules/security/infrastructure/repositories/JWTAuthenticationRepository";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string | undefined;
  role?: string | undefined;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Variables de entorno
  config()?.parsed;
  let JWT_SECRET: string | undefined = process.env.JWT_SECRET;

  try {
    const tokenManager = new JWTAuthenticationRepository();
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Acceso denegado" });
    }

    const tokenParts = token.split(" ");
    const tokenFormatted = tokenParts[1];

    if (!JWT_SECRET) {
      throw new Error(
        "JWT_SECRET no está definido en las variables de entorno"
      );
    }

    // Validación de token
    let isValidToken: boolean = await tokenManager.verifyToken(tokenFormatted);

    if (!isValidToken) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    // Extracción del rol del token
    let decodedToken = await tokenManager.decodeToken(tokenFormatted);
    req.role = decodedToken && decodedToken.role;
    req.user = decodedToken && decodedToken.userId;

    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al validar el token de autorización" });
  }
};
