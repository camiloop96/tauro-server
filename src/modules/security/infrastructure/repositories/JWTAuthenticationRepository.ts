import { IAuthenticationRepository } from "@modules/security/domain/repositories/IAuthenticationRepository";
import { AppError } from "@shared/errors/AppError";
import { config } from "dotenv";
import { JwtPayload, VerifyErrors, decode, sign, verify } from "jsonwebtoken";

// Variables de entorno
config()?.parsed;
let JWT_SECRET: string | undefined = process.env.JWT_SECRET;

export class JWTAuthenticationRepository implements IAuthenticationRepository {
  async verifyToken(token: string): Promise<boolean> {
    try {
      // Verificar si el JWT_SECRET está definido
      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in env");
      }
      return new Promise<boolean>((resolve, reject) => {
        verify(
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
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error verifying token", 500);
      }
    }
  }
  async decodeToken(token: string): Promise<JwtPayload> {
    try {
      // Token exist validation
      if (!token) {
        throw new Error("Missing token");
      }
      // Decodificar el token
      const tokenDecoded = decode(token) as JwtPayload;

      if (!tokenDecoded) {
        throw new AppError("Authorization token invalid", 400);
      }

      return tokenDecoded;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error decoding token", 500);
      }
    }
  }
  async createToken(payload: any): Promise<string> {
    try {
      // Check if JWT_SECRET is on env
      if (!JWT_SECRET) {
        throw new AppError("JWT_SECRET is not defined in env", 404);
      }
      // Create token
      const token: string = sign(payload, JWT_SECRET);
      return token;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error creating token", 500);
      }
    }
  }
}
