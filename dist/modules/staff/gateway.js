"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Routes Staff Gateway
const express_1 = require("express");
const employeeRoutes_1 = __importDefault(require("./infrastructure/routes/employeeRoutes"));
// User routes instance router
const staffRoutes = (0, express_1.Router)();
// Routes
staffRoutes.use("/employee/", employeeRoutes_1.default);
// User export router
exports.default = staffRoutes;
