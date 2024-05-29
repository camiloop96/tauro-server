import { User } from "@modules/security/domain/entities/User";
import { IUserRepository } from "@modules/security/domain/repositories/IUserRepository";
import { Types, isValidObjectId } from "mongoose";
import { AppError } from "src/shared/errors/AppError";
import UserModel from "../models/UserModel";
import CredentialModel from "../models/CredentialModel";

export class MongoUserRepository implements IUserRepository {
  getUsersByRol(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  async isExistEmployeeUser(id: Types.ObjectId): Promise<boolean> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      let existEmployeeUser = await UserModel.findOne({
        employee: id,
      });
      if (existEmployeeUser) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new AppError("Error fetching employee", 500);
    }
  }
  async getByEmployeeId(id: string): Promise<User | null> {
    try {
      // Check if is valid ID
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Invalid or missing ID", 400);
      }
      // Check if user exist
      const existUser: User | null = await UserModel.findById(id);
      if (!existUser) {
        throw new AppError("User not found", 404);
      }
      // Return user object
      return existUser;
    } catch (error: any) {
      throw new AppError("Error fetching user", 500, error);
    }
  }

  async getList(): Promise<User[]> {
    try {
      const userList: User[] = await UserModel.find();
      return userList;
    } catch (error) {
      throw new AppError("Error fetching user", 500);
    }
  }
  async save(user: User): Promise<void> {
    const newCredential = new CredentialModel({
      username: user.username,
      password: user.password,
    });
    const newUser = new UserModel({
      employee: user.employee,
      role: user.role,
      credential: newCredential._id,
    });
    await newUser.save();
    await newCredential.save();
  }
}
