"use strict";
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
exports.CreateEmployee = void 0;
const EmployeeModel_1 = require("../models/EmployeeModel");
const SellerModel_1 = require("../../Seller/models/SellerModel");
const CreateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, DNI, branchStore, position } = req.body || {};
    try {
        let existingEmployee = yield EmployeeModel_1.EmployeeModel.findOne({
            DNI: DNI,
        });
        if (existingEmployee) {
            return res.status(400).json({
                message: "Empleado ya existe",
            });
        }
        const newEmployee = new EmployeeModel_1.EmployeeModel({
            name,
            lastName,
            DNI,
            branchStore,
            position,
        });
        if (position === "seller") {
            let existSeller = yield SellerModel_1.SellerModel.findOne({
                employee: newEmployee._id,
            });
            if (!existSeller) {
                yield SellerModel_1.SellerModel.create({ employee: newEmployee._id });
            }
        }
        yield newEmployee.save();
        res.status(200).json(newEmployee);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.CreateEmployee = CreateEmployee;
