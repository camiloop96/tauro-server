import { User } from "@modules/security/domain/entities/User";
import { Types } from "mongoose";

export interface IUserRepository {
  saveUser(user: User): Promise<void>;
  getList(): Promise<User[]>;
  getByEmployeeId(id: string): Promise<User | null>;
  isExistEmployeeUser(id: Types.ObjectId): Promise<boolean>;
  getUsersByRole(id: Types.ObjectId): Promise<User[]>;
  getUserByToken(token: string): Promise<Types.ObjectId>;
  getUserByCredential(credential: Types.ObjectId | undefined): Promise<User>;
  createRootUser(user: User): Promise<void>;
}
