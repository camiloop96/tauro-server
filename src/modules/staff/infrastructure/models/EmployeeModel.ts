// src/models/Branch.ts
import { Schema, Types, model } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  lastName: string;
  DNI: number;
  branchStore: Types.ObjectId;
  position: string;
}

const employeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  DNI: { type: Number, required: true },
  branchStore: { type: Schema.ObjectId, required: true },
  position: { type: String, required: true },
});

const EmployeeModel = model<IEmployee>("Employee", employeeSchema);

export { EmployeeModel };
