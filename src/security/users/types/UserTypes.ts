import { Document, Schema, Types } from "mongoose";

// Interface de Usuario
export interface IUser extends Document {
  employee: Types.ObjectId;
  role: Schema.Types.ObjectId;
}

export interface IUserQueryData {
  _id: Types.ObjectId;
  fullName: string;
  cityBranchStore: {
    name: string | undefined;
    city: string | undefined;
  };
  sellerID?: Types.ObjectId | null;
}
