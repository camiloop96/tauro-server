"use strict";
/**
 * @file staffGateway.ts
 * @description Aggregates all staff-related routes, including employee routes, and defines the base path for these routes.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = require("express");
const employeeRoutes_1 = __importDefault(require("./infrastructure/routes/employeeRoutes"));
// Staff routes instance router
const staffRoutes = (0, express_1.Router)();
/**
 * Base route for employee-related operations.
 * @route /employee/
 */
staffRoutes.use("/employee/", employeeRoutes_1.default);
// Export the staff routes
exports.default = staffRoutes;
