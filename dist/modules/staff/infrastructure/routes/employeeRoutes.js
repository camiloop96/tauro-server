"use strict";
// Modules
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
const express_1 = require("express");
const CreateEmployeeController_1 = require("../controllers/CreateEmployeeController");
// Employee routes instance router
const employeeRoutes = (0, express_1.Router)();
// Create Employee controller instances
const createemployeeController = new CreateEmployeeController_1.CreateEmployeeController();
// Routes
employeeRoutes.post("/create/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield createemployeeController.execute(req, res);
}));
