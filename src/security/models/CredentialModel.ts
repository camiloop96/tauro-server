import { Schema, model, Document, Types } from "mongoose";

export interface ICredentials extends Document {
  username: string;
  password: string;
  user: Types.ObjectId;
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CredentialsModel = model<ICredentials>("Credentials", credentialsSchema);

export default CredentialsModel;
