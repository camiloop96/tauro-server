import { Credential } from "@modules/security/domain/entities/Credential";
import { ICredentialsRepository } from "@modules/security/domain/repositories/ICredentialRepository";
import CredentialModel from "../models/CredentialModel";
import { Types } from "mongoose";
import { AppError } from "src/shared/errors/AppError";
import { generateHashPassword } from "@modules/security/shared/passwordManager";

export class MongoCredentialRepository implements ICredentialsRepository {
  async getCredentialsByUsername(username: string): Promise<Credential> {
    try {
      const existCredential = await CredentialModel.findOne({
        username: username,
      });
      if (!existCredential) {
        throw new AppError("Invalid credentials", 401);
      }
      return existCredential;
    } catch (error) {
      throw new AppError("Error fetching credentials", 500);
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
      throw new AppError("Error creating credential", 500, error);
    }
  }
}
