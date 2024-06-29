"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateEmployee_1 = require("./controllers/CreateEmployee");
const EmployeeRoutes = (0, express_1.Router)();
EmployeeRoutes.post("/create/", CreateEmployee_1.CreateEmployee);
exports.default = EmployeeRoutes;
