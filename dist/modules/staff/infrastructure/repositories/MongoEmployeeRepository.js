"use strict";
/**
 * @file MongoEmployeeRepository.ts
 * @description Implements the IEmployeeRepository interface for interacting with Employee data in MongoDB.
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
exports.MongoEmployeeRepository = void 0;
const mongoose_1 = require("mongoose");
const EmployeeModel_1 = require("../models/EmployeeModel");
const AppError_1 = require("../../../../shared/errors/AppError");
/**
 * Class representing a repository for managing Employee entities in MongoDB.
 * @implements {IEmployeeRepository}
 */
class MongoEmployeeRepository {
    /**
     * Fetches the details of an employee by their ID.
     * @param id - The ObjectId of the employee.
     * @returns A promise that resolves to an Employee entity.
     * @throws {AppError} Throws an error if the ID is invalid or if the employee is not found.
     */
    getEmployeeDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Invalid or missing ID", 400);
                }
                const employeeDetail = yield EmployeeModel_1.EmployeeModel.findById(id).select("-__v");
                if (!employeeDetail) {
                    throw new AppError_1.AppError("Employee not found", 400);
                }
                return employeeDetail;
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
    /**
     * Checks if an employee exists by their DNI.
     * @param DNI - The DNI of the employee.
     * @returns A promise that resolves to a boolean indicating if the employee exists.
     * @throws {AppError} Throws an error if the DNI is not a number.
     */
    employeeExistByDNI(DNI) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (isNaN(DNI)) {
                    throw new AppError_1.AppError("DNI must be number", 400);
                }
                const existEmployee = yield EmployeeModel_1.EmployeeModel.findOne({ DNI: DNI });
                return !!existEmployee;
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
    /**
     * Saves an employee document.
     * @param employee - The employee document to save.
     * @returns A promise that resolves when the employee is saved.
     * @throws {AppError} Throws an error if saving fails.
     */
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
    /**
     * Checks if an employee exists by their ID.
     * @param id - The ID of the employee.
     * @returns A promise that resolves to a boolean indicating if the employee exists.
     * @throws {AppError} Throws an error if the ID is invalid or if fetching fails.
     */
    employeeExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || isNaN(id)) {
                    throw new AppError_1.AppError("Invalid or missing ID", 400);
                }
                const existingEmployee = yield EmployeeModel_1.EmployeeModel.findOne({ DNI: id });
                return !!existingEmployee;
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
    /**
     * Fetches an employee by their ID.
     * @param id - The ObjectId of the employee.
     * @returns A promise that resolves to the ObjectId of the employee.
     * @throws {AppError} Throws an error if the ID is invalid or if the employee is not found.
     */
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Invalid or missing id", 400);
                }
                const existingEmployee = yield EmployeeModel_1.EmployeeModel.findById(id);
                if (!existingEmployee) {
                    throw new AppError_1.AppError("Employee not found", 404);
                }
                return existingEmployee._id;
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
    /**
     * Creates a new employee.
     * @param employee - The employee entity to create.
     * @returns A promise that resolves to the created employee document.
     * @throws {AppError} Throws an error if the employee data is invalid or if the employee already exists.
     */
    createEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                const existingEmployee = yield EmployeeModel_1.EmployeeModel.findOne({ DNI: DNI });
                if (existingEmployee) {
                    throw new AppError_1.AppError("Employee is already exist", 400);
                }
                const newEmployee = new EmployeeModel_1.EmployeeModel(employee);
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
