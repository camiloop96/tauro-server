import { Types } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  lastName: string;
  DNI: number;
  branchStore: Types.ObjectId;
  position: string;
}
