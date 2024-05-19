import { Document, Schema } from "mongoose";

// Interface de Usuario
export interface IUser extends Document {
  employee: string;
  role: Schema.Types.ObjectId;
}
