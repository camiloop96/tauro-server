import { Types } from "mongoose";

export class Seller {
  constructor(
    public employee: Types.ObjectId,
    public active?: boolean,
    public _id?: Types.ObjectId
  ) {}
}
