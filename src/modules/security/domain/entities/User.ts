import { Types } from "mongoose";

export class User {
  constructor(
    public employee: Types.ObjectId,
    public role: Types.ObjectId | null,
    public credential: Types.ObjectId,
    public _id?: Types.ObjectId
  ) {}
}
