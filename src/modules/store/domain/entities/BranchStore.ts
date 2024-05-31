import { Types } from "mongoose";

export class BranchStore {
  constructor(
    public name: string,
    public state: string,
    public city: string,
    _id?: Types.ObjectId
  ) {}
}
