import { Document, Schema, Types } from "mongoose";

// Interface de Usuario
export interface IUser extends Document {
  employee: Types.ObjectId;
  role: Schema.Types.ObjectId;
}
