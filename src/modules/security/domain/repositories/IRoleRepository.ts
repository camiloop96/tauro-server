import { Types } from "mongoose";
import { Role } from "../entities/Role";

export interface IRoleRepository {
  createRole(role: Role): Promise<void>;
  listRoles(): Promise<Role[]>;
  getRoleByName(name: string): Promise<Types.ObjectId>;
  getDetailRole(id: Types.ObjectId): Promise<Role>;
  getRoleFromToken(token: string): Promise<Role>;
  deleteRole(id: Types.ObjectId): Promise<void>;
  updateRole(id: Types.ObjectId): Promise<void>;
  roleIsExist(id: Types.ObjectId): Promise<boolean>;
}
