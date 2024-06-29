import { Types } from "mongoose";
import { Credential } from "../entities/Credential";

export interface ICredentialsRepository {
  createCredential(credential: Credential): Promise<Types.ObjectId>;
  getCredentialsByUsername(username: string): Promise<Credential>;
  createRootCredential(credential: Credential): Promise<Types.ObjectId>;
  credentialIsExist(username: string): Promise<boolean | null>;
}
