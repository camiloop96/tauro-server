import { Types } from "mongoose";
import { Role } from "../entities/Role";

export interface IRoleRepository {
  createRole(role: Role): Promise<void>;
  getRoleList(): Promise<Role[]>;
  getRoleByName(name: string): Promise<Types.ObjectId | null>;
  getDetailRole(id: Types.ObjectId): Promise<Role>;
  getRoleByUserId(id: Types.ObjectId | undefined): Promise<string>;
  deleteRole(id: Types.ObjectId): Promise<void>;
  updateRole(id: Types.ObjectId, payload: Role): Promise<void>;
  roleIsExist(id: Types.ObjectId): Promise<boolean>;
  checkAndParseID(id: string): Promise<Types.ObjectId>;
}
