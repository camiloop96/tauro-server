import { Credential } from "@modules/security/domain/entities/Credential";
import { ICredentialsRepository } from "@modules/security/domain/repositories/ICredentialRepository";
import CredentialModel from "../models/CredentialModel";
import { Types } from "mongoose";
import { generateHashPassword } from "@modules/security/shared/passwordManager";
import { AppError } from "@shared/errors/AppError";

export class MongoCredentialRepository implements ICredentialsRepository {
  async credentialIsExist(username: string): Promise<boolean | null> {
    try {
      const existCredential = await CredentialModel.findOne({
        username: username,
      });
      if (existCredential) {
        return true;
      } else {
        return null;
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching credentials", 500, error);
      }
    }
  }
  async createRootCredential(credential: Credential): Promise<Types.ObjectId> {
    try {
      const { username, password } = credential || {};

      // Hash password
      const hashPassword = await generateHashPassword(password);

      // Create credential
      const newCredential = new CredentialModel({
        username: username,
        password: hashPassword,
      });

      // Save credential
      const saveCredential = await newCredential.save();

      // Return
      return saveCredential._id;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error creating root credentials", 500);
      }
    }
  }
  async getCredentialsByUsername(username: string): Promise<Credential> {
    try {
      const existCredential = await CredentialModel.findOne({
        username: username,
      });
      if (!existCredential) {
        throw new AppError("Invalid credentials", 401);
      }
      return existCredential;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching credentials", 500);
      }
    }
  }
  async createCredential(credential: Credential): Promise<Types.ObjectId> {
    try {
      // Destructing params
      let { username, password } = credential || {};

      // Check is username is already exist
      const isExistUsername = await CredentialModel.findOne({
        username: username,
      });

      if (isExistUsername) {
        throw new AppError("Username is already in use", 400);
      }

      // Hash password
      const hashPassword = await generateHashPassword(password);

      // Create Credential
      const newCredential = new CredentialModel({
        username: username,
        password: hashPassword,
      });

      // Save credential
      let save = await newCredential.save();

      // Return id
      return save._id;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error creating credential", 500, error);
      }
    }
  }
}
