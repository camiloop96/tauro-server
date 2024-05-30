import { Schema, Document, model, Model } from "mongoose";

// Schema interface
interface IRole {
  name: string;
  description?: string;
}

// Rople Schema
const roleSchema: Schema<IRole> = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
    default: null,
  },
});

// Export Model
export default model<IRole>("Role", roleSchema);
