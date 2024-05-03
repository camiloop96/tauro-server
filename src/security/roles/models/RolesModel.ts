import { Schema, Document, model, Model } from "mongoose";

interface RoleAttributes {
  name: string;
  description?: string;
}

export interface IRole extends RoleAttributes, Document {}

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

const RoleModel: Model<IRole> = model<IRole>("Role", roleSchema);

export default RoleModel;
