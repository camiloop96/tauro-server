"use strict";
/**
 * @file CreateEmployeeUseCase.ts
 * @description Defines the CreateEmployeeUseCase class responsible for creating an employee and optionally a seller.
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
exports.CreateEmployeeUseCase = void 0;
const AppError_1 = require("../../../../../shared/errors/AppError");
/**
 * Class implementing the create employee use case.
 */
class CreateEmployeeUseCase {
    /**
     * Creates an instance of CreateEmployeeUseCase.
     *
     * @param {IEmployeeRepository} employeeRepository - The repository for employee operations.
     * @param {ISellerRepository} sellerRepository - The repository for seller operations.
     * @param {IBranchStoreRepository} branchStoreRepository - The repository for branch store operations.
     */
    constructor(employeeRepository, sellerRepository, branchStoreRepository) {
        this.employeeRepository = employeeRepository;
        this.sellerRepository = sellerRepository;
        this.branchStoreRepository = branchStoreRepository;
    }
    /**
     * Executes the create employee use case.
     *
     * @param {IEmployeeRequest} employeeData - The data of the employee to be created.
     * @returns {Promise<void>} A promise that resolves when the employee is created.
     * @throws {AppError} Throws an application-specific error if the creation fails.
     */
    execute(employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastName, DNI, branchStore, position } = employeeData || {};
            // Parse Branch Store ID
            const parsedBranchStoreID = yield this.branchStoreRepository.checkAndParseID(branchStore);
            // Check if branch store exists
            const branchStoreExist = yield this.branchStoreRepository.checkIfBranchStoreExist(parsedBranchStoreID);
            if (!branchStoreExist) {
                throw new AppError_1.AppError("Branch Store not found", 404);
            }
            // Check if employee already exists
            const employeeExist = yield this.employeeRepository.employeeExist(DNI);
            if (employeeExist) {
                throw new AppError_1.AppError("Employee already exists", 400);
            }
            // Create employee
            const createEmployee = yield this.employeeRepository.createEmployee({
                name,
                lastName,
                DNI,
                branchStore: parsedBranchStoreID,
                position,
            });
            // Create seller if position is "seller"
            if (position === "seller") {
                yield this.sellerRepository.createSeller(createEmployee._id);
            }
            // Save employee
            yield this.employeeRepository.saveEmployee(createEmployee);
        });
    }
}
exports.CreateEmployeeUseCase = CreateEmployeeUseCase;
