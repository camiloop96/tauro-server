import { Schema, Document, model, Model } from "mongoose";

interface IRole {
  name: string;
  description?: string;
}

const roleSchema: Schema<IRole> = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});
export default model<IRole>("Role", roleSchema);
