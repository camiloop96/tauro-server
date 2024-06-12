import { Types } from "mongoose";

export class Credential {
  constructor(
    public username: string,
    public password: string,
    public _id?: Types.ObjectId | undefined
  ) {}
}
