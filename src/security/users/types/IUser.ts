import { Document, Schema } from "mongoose";

// Interface de Usuario
export interface IUser extends Document {
  fullName: string;
  role: Schema.Types.ObjectId;
}
