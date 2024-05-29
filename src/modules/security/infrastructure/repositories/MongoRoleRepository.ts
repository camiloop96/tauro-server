import { Role } from "@modules/security/domain/entities/Role";
import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import { AppError } from "src/shared/errors/AppError";
import RoleModel from "../models/RoleModel";
import { Schema, Types, isValidObjectId } from "mongoose";

export class MongoRoleRepository implements IRoleRepository {
  async roleIsExist(id: Types.ObjectId): Promise<boolean> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      let roleExist = await RoleModel.findById(id);
      if (roleExist) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new AppError("Error fetching role", 500);
    }
  }
  getDetailRole(id: Types.ObjectId): Promise<Role> {
    throw new Error("Method not implemented.");
  }
  getRoleFromToken(token: string): Promise<Role> {
    throw new Error("Method not implemented.");
  }
  // Delete role
  async deleteRole(id: Types.ObjectId): Promise<void> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      await RoleModel.findByIdAndDelete(id);
    } catch (error) {
      throw new AppError("Error fetching roles", 500);
    }
  }
  // Update Role
  updateRole(id: Types.ObjectId): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getRoleByName(name: string): Promise<Types.ObjectId> {
    try {
      const existRole = await RoleModel.findOne({
        name: name,
      });
      if (!existRole) {
        throw new AppError("Role not found", 404);
      }
      return existRole._id;
    } catch (error) {
      throw new AppError("Error fetching Roles", 500);
    }
  }
  // Create role
  async createRole(role: Role): Promise<void> {
    try {
      // Desctructing role
      const { name, description } = role || {};

      // Check if role is undefined
      if (!name) {
        throw new AppError("Role name cannot be undefined", 400);
      }
      // Save role
      const newRole = new RoleModel({
        name: name,
        description: description,
      });
      await newRole.save();
    } catch (error) {
      throw new AppError("Error creating role", 500);
    }
  }
  async listRoles(): Promise<Role[]> {
    try {
      // Get role list
      let roleList: Role[] = await RoleModel.find();
      // return role list
      return roleList;
    } catch (error: any) {
      throw new AppError("Error getting role list", 500, error);
    }
  }
}
