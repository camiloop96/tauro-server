import { config } from "dotenv";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

// Variables de entorno
config()?.parsed;
let JWT_SECRET: string | undefined = process.env.JWT_SECRET;

export const createToken = (payload: any): string => {
  // Verificar si el JWT_SECRET está definido
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }
  // Crear el token JWT con un vencimiento de 1 hora
  const token: string = jwt.sign(payload, JWT_SECRET);
  return token;
};

export const verifyToken = async (token: string): Promise<boolean> => {
  // Verificar si el JWT_SECRET está definido
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }
  return new Promise<boolean>((resolve, reject) => {
    jwt.verify(
      token,
      JWT_SECRET!,
      (error: VerifyErrors | null, decodedToken) => {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const decodeToken = async (
  token: string
): Promise<JwtPayload | null> => {
  try {
    if (!token) {
      throw new Error("Token no proporcionado");
    }

    // Decodificar el token
    const tokenDecoded = jwt.decode(token) as JwtPayload;

    if (!tokenDecoded) {
      throw new Error("Token de autorización inválido");
    }

    return tokenDecoded;
  } catch (error) {
    throw error;
  }
};
