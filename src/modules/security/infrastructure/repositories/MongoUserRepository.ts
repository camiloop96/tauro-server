import { User } from "@modules/security/domain/entities/User";
import { IUserRepository } from "@modules/security/domain/repositories/IUserRepository";
import { Types, isValidObjectId } from "mongoose";
import UserModel from "../models/UserModel";
import { AppError } from "@shared/errors/AppError";
import { JWTAuthenticationRepository } from "./JWTAuthenticationRepository";

const tokenManager = new JWTAuthenticationRepository();

export class MongoUserRepository implements IUserRepository {
  async getUserByCredential(credential: Types.ObjectId): Promise<User> {
    try {
      if (!credential || !isValidObjectId(credential)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      const existCredential: User | null = await UserModel.findOne({
        credential: credential,
      });

      if (!existCredential) {
        throw new AppError("Invalid credentials", 404);
      }

      return existCredential;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching user", 500);
      }
    }
  }
  async getUserByToken(token: string): Promise<Types.ObjectId> {
    try {
      // Check missing token
      if (!token) {
        throw new AppError("Missing token", 400);
      }
      // Decode token
      const decodedToken = await tokenManager.decodeToken(token);

      if (!decodedToken) {
        throw new AppError("Token not valid", 400);
      }

      // Search User
      const userId = decodedToken.userId;
      const findUser = await UserModel.findById(userId);

      if (!findUser) {
        throw new AppError("User not found", 404);
      }

      return findUser._id;
    } catch (error) {
      throw new AppError("Error fetching user", 500);
    }
  }
  async getUsersByRole(id: Types.ObjectId): Promise<User[]> {
    try {
      // Check is valid ID
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      // Find User list
      let userList: User[] = await UserModel.find({
        role: id,
      });
      return userList;
    } catch (error: any) {
      throw new AppError("Error fetching users", 400, error);
    }
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
  async saveUser(user: User): Promise<void> {
    try {
      const newUser = new UserModel({
        employee: user.employee,
        role: user.role,
        credential: user.credential,
      });
      await newUser.save();
    } catch (error) {
      throw new AppError("Error saving user", 500);
    }
  }
}
