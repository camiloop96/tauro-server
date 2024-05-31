import { Types } from "mongoose";

export class Employee {
  constructor(
    public name: string,
    public lastName: string,
    public DNI: number,
    public branchStore: Types.ObjectId,
    public position: string,
    public _id?: Types.ObjectId
  ) {}
}
