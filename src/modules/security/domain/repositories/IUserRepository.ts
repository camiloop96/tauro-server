import { User } from "@modules/security/domain/entities/User";
import { Types } from "mongoose";

export interface IUserRepository {
  save(user: User): Promise<void>;
  getList(): Promise<User[]>;
  getByEmployeeId(id: string): Promise<User | null>;
  isExistEmployeeUser(id: Types.ObjectId): Promise<boolean>;
  getUsersByRol(): Promise<User[]>;
}
