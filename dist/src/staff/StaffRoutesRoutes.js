"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmployeeRoutes_1 = __importDefault(require("./Employee/EmployeeRoutes"));
const SellerRoutes_1 = __importDefault(require("./Seller/SellerRoutes"));
const StaffRoutes = (0, express_1.Router)();
StaffRoutes.use("/employee/", EmployeeRoutes_1.default);
StaffRoutes.use("/employee/seller/", SellerRoutes_1.default);
exports.default = StaffRoutes;
