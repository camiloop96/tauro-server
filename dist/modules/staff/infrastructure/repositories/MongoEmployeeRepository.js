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
const AppError_1 = require("src/shared/errors/AppError");
const EmployeeModel_1 = require("../models/EmployeeModel");
class MongoEmployeeRepository {
    employeeExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Invalid or missing ID", 400);
                }
                let existingEmployee = yield EmployeeModel_1.EmployeeModel.findById(id);
                if (existingEmployee) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new AppError_1.AppError("Error fetching employee", 500);
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
                throw new AppError_1.AppError("Error fetching employee", 500);
            }
        });
    }
    createEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!employee.name || employee.name.length === 0) {
                    throw new AppError_1.AppError("Name is required", 400);
                }
                if (!employee.lastName || employee.lastName.length === 0) {
                    throw new AppError_1.AppError("Lastname is required", 400);
                }
                if (!employee.DNI) {
                    throw new AppError_1.AppError("DNI is required", 400);
                }
                else if (isNaN(employee.DNI)) {
                    throw new AppError_1.AppError("DNI must be valid number", 400);
                }
                if (!employee.branchStore || !(0, mongoose_1.isValidObjectId)(employee.branchStore)) {
                    throw new AppError_1.AppError("Invalid or missing Branch Store ID", 400);
                }
                let existingEmployee = yield EmployeeModel_1.EmployeeModel.findOne({
                    DNI: employee.DNI,
                });
                if (existingEmployee) {
                    throw new AppError_1.AppError("User is already exist", 400);
                }
                let newEmployee = new EmployeeModel_1.EmployeeModel(employee);
                yield newEmployee.save();
            }
            catch (error) {
                throw new AppError_1.AppError("Error creating employee", 500);
            }
        });
    }
}
exports.MongoEmployeeRepository = MongoEmployeeRepository;
