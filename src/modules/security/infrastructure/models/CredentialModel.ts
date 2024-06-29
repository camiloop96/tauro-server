import { Schema, model, Document, Types } from "mongoose";

export interface ICredentials extends Document {
  username: string;
  password: string;
}

const credentialsSchema = new Schema<ICredentials>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<ICredentials>("Credential", credentialsSchema);
