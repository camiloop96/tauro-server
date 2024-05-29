"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
// src/models/Branch.ts
const mongoose_1 = require("mongoose");
const employeeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    DNI: { type: Number, required: true },
    branchStore: { type: mongoose_1.Schema.ObjectId, required: true },
    position: { type: String, required: true },
});
const EmployeeModel = (0, mongoose_1.model)("Employee", employeeSchema);
exports.EmployeeModel = EmployeeModel;
