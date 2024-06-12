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
exports.MongoEmployeeRepository = void 0;
const mongoose_1 = require("mongoose");
const EmployeeModel_1 = require("../models/EmployeeModel");
const AppError_1 = require("../../../../shared/errors/AppError");
class MongoEmployeeRepository {
    employeeExistByDNI(DNI) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (isNaN(DNI)) {
                    throw new AppError_1.AppError("DNI must be number", 400);
                }
                const existEmployee = yield EmployeeModel_1.EmployeeModel.findOne({
                    DNI: DNI,
                });
                if (existEmployee) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching employee", 500);
                }
            }
        });
    }
    saveEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield employee.save();
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error creating employee", 500);
                }
            }
        });
    }
    employeeExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || isNaN(id)) {
                    throw new AppError_1.AppError("Invalid or missing ID", 400);
                }
                let existingEmployee = yield EmployeeModel_1.EmployeeModel.findOne({ DNI: id });
                if (existingEmployee) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching employee", 500);
                }
            }
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Invalid or missing id", 400);
                }
                let existingEmployee = yield EmployeeModel_1.EmployeeModel.findById(id);
                if (!existingEmployee) {
                    throw new AppError_1.AppError("Employee not found", 404);
                }
                return existingEmployee._id;
            }
            catch (error) {
                if (error instanceof error) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching employee", 500);
                }
            }
        });
    }
    createEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Destructure params
                const { name, lastName, DNI, branchStore } = employee || {};
                if (!name || name.length === 0) {
                    throw new AppError_1.AppError("Name is required", 400);
                }
                if (!lastName || lastName.length === 0) {
                    throw new AppError_1.AppError("Lastname is required", 400);
                }
                if (!DNI) {
                    throw new AppError_1.AppError("DNI is required", 400);
                }
                else if (isNaN(DNI)) {
                    throw new AppError_1.AppError("DNI must be valid number", 400);
                }
                if (!branchStore || !(0, mongoose_1.isValidObjectId)(branchStore)) {
                    throw new AppError_1.AppError("Invalid or missing Branch Store ID", 400);
                }
                let existingEmployee = yield EmployeeModel_1.EmployeeModel.findOne({
                    DNI: DNI,
                });
                if (existingEmployee) {
                    throw new AppError_1.AppError("Employee is already exist", 400);
                }
                let newEmployee = new EmployeeModel_1.EmployeeModel(employee);
                return newEmployee;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error creating employee", 500);
                }
            }
        });
    }
}
exports.MongoEmployeeRepository = MongoEmployeeRepository;
