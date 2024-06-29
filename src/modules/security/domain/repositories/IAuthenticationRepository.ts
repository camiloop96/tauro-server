import { JwtPayload } from "jsonwebtoken";

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  role: string;
}

export interface IAuthenticationRepository {
  createToken(payload: any): Promise<string>;
  verifyToken(token: string): Promise<boolean>;
  decodeToken(token: string): Promise<JwtPayload>;
}
