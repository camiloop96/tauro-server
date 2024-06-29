/**
 * @file Branch.ts
 * @description Defines the Mongoose schema and model for the Employee entity.
 */

import { Schema, Types, model, Document } from "mongoose";

/**
 * Interface representing an Employee document in MongoDB.
 */
export interface IEmployee extends Document {
  name: string;
  lastName: string;
  DNI: number;
  branchStore: Types.ObjectId;
  position: string;
}

/**
 * Mongoose schema for the Employee entity.
 */
const employeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  DNI: { type: Number, required: true },
  branchStore: { type: Schema.Types.ObjectId, required: true },
  position: { type: String, required: true },
});

/**
 * Mongoose model for the Employee entity.
 */
const EmployeeModel = model<IEmployee>("Employee", employeeSchema);

export { EmployeeModel };
