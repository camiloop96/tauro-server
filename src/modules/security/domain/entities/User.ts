import { Employee } from "@modules/staff/domain/entities/Employee";
import { Types } from "mongoose";
import { Role } from "./Role";

export class User {
  constructor(
    public _id: Types.ObjectId,
    public employee: Employee,
    public role: Role,
    public username: string,
    public password: string
  ) {}
}
