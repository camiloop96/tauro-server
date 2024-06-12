import { Role } from "@modules/security/domain/entities/Role";
import { IRoleRepository } from "@modules/security/domain/repositories/IRoleRepository";
import RoleModel from "../models/RoleModel";
import { Types, isValidObjectId } from "mongoose";
import { AppError } from "@shared/errors/AppError";

export class MongoRoleRepository implements IRoleRepository {
  async createRootRole(role: string): Promise<Types.ObjectId> {
    try {
      const createRole = new RoleModel({
        name: role,
      });
      const saveRole = await createRole.save();
      return saveRole._id;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error creating root user", 500);
      }
    }
  }
  // Obtaining role by user ID
  async getRoleByUserId(id: Types.ObjectId): Promise<string> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      const findRole = await RoleModel.findById(id);
      if (!findRole) {
        throw new AppError("Role not found", 404);
      }
      return findRole.name;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching roles", 500);
      }
    }
  }
  // Check and parse ID
  async checkAndParseID(id: string): Promise<Types.ObjectId> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      let parseID = new Types.ObjectId(id);
      return parseID;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error parsing ID", 500);
      }
    }
  }
  // Role existence
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
  // Detail role
  async getDetailRole(id: Types.ObjectId): Promise<Role> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      let role = await RoleModel.findById(id);
      if (!role) {
        throw new AppError("Role not found", 404);
      }
      return role;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching role", 500);
      }
    }
  }

  // Delete role
  async deleteRole(id: Types.ObjectId): Promise<void> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      await RoleModel.findByIdAndDelete(id);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching roles", 500);
      }
    }
  }
  // Update Role
  async updateRole(id: Types.ObjectId, payload: Role): Promise<void> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      if (Object.keys(payload).length === 0) {
        throw new AppError("Role data cannot be empty", 400);
      }

      const updateRole = await RoleModel.findByIdAndUpdate(
        id,
        { $set: payload },
        { new: true, runValidators: true }
      );

      if (!updateRole) {
        throw new AppError("Role not found", 404);
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching Roles", 500);
      }
    }
  }
  // Obtaining role by name
  async getRoleByName(name: string): Promise<Types.ObjectId | null> {
    try {
      const existRole = await RoleModel.findOne({
        name: name,
      });
      if (existRole) {
        return existRole._id;
      } else {
        return null;
      }
    } catch (error: any) {
      throw new AppError("Error fetching Roles", 500, error);
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
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error creating role", 500);
      }
    }
  }
  // Obtaining role list
  async getRoleList(): Promise<Role[]> {
    try {
      // Get role list
      let roleList: Role[] = await RoleModel.find()
        .select("-description -__v")
        .exec();

      // return role list
      return roleList;
    } catch (error: any) {
      throw new AppError("Error getting role list", 500, error);
    }
  }
}
