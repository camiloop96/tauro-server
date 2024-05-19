// src/models/Branch.ts
import { Schema, model } from "mongoose";
import { IEmployee } from "../types/EmployeeTypes";

const employeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  DNI: { type: Number, required: true },
  branchStore: { type: Schema.ObjectId, required: true },
  position: { type: String, required: true },
});

const EmployeeModel = model<IEmployee>("Employee", employeeSchema);

export { EmployeeModel };
