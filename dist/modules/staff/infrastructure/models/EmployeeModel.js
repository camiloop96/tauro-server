"use strict";
/**
 * @file Branch.ts
 * @description Defines the Mongoose schema and model for the Employee entity.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
const mongoose_1 = require("mongoose");
/**
 * Mongoose schema for the Employee entity.
 */
const employeeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    DNI: { type: Number, required: true },
    branchStore: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    position: { type: String, required: true },
});
/**
 * Mongoose model for the Employee entity.
 */
const EmployeeModel = (0, mongoose_1.model)("Employee", employeeSchema);
exports.EmployeeModel = EmployeeModel;
