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
exports.CreateEmployeeUseCase = void 0;
const AppError_1 = require("../../../../../shared/errors/AppError");
class CreateEmployeeUseCase {
    constructor(employeeRepository, sellerRepository, branchStoreRepository) {
        this.employeeRepository = employeeRepository;
        this.sellerRepository = sellerRepository;
        this.branchStoreRepository = branchStoreRepository;
    }
    execute(employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastName, DNI, branchStore, position } = employeeData || {};
            // Parse Branch Store ID
            const parsedBranchStoreID = yield this.branchStoreRepository.checkAndParseID(branchStore);
            // Check if branch store exist
            const branchStoreExist = yield this.branchStoreRepository.checkIfBranchStoreExist(parsedBranchStoreID);
            if (!branchStoreExist) {
                throw new AppError_1.AppError("Branch Store not found ", 404);
            }
            // Check if employee exist
            const employeeExist = yield this.employeeRepository.employeeExist(DNI);
            if (employeeExist) {
                throw new AppError_1.AppError("Employee is already exist", 400);
            }
            // Initialize create employee
            const createEmployee = yield this.employeeRepository.createEmployee({
                name,
                lastName,
                DNI,
                branchStore: parsedBranchStoreID,
                position,
            });
            // Create seller
            if (position === "seller") {
                yield this.sellerRepository.createSeller(createEmployee._id);
            }
            // Save employee
            yield this.employeeRepository.saveEmployee(createEmployee);
        });
    }
}
exports.CreateEmployeeUseCase = CreateEmployeeUseCase;
