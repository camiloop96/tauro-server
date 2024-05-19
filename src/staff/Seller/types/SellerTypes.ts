import { Types } from "mongoose";

export interface ISeller extends Document {
  employee: Types.ObjectId;
  active: boolean;
}
