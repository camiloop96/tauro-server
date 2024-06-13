"use strict";
/**
 * @file employeeRoutes.ts
 * @description Defines routes for employee-related operations, including creating an employee.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
const express_1 = require("express");
const CreateEmployeeController_1 = require("../controllers/CreateEmployeeController");
// Employee routes instance router
const employeeRoutes = (0, express_1.Router)();
// Create Employee controller instances
const createEmployeeController = new CreateEmployeeController_1.CreateEmployeeController();
/**
 * Route for creating a new employee.
 * @route POST /create/
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
employeeRoutes.post("/create/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield createEmployeeController.execute(req, res);
}));
// Export
exports.default = employeeRoutes;
