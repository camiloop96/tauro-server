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
exports.CreateEmployeeController = void 0;
const CreateEmployeeUseCase_1 = require("../../../staff/application/useCases/employee/CreateEmployeeUseCase");
const MongoEmployeeRepository_1 = require("../repositories/MongoEmployeeRepository");
const MongoSellerRepository_1 = require("../repositories/MongoSellerRepository");
const MongoBranchStoreRepository_1 = require("../../../store/infraestructure/repositories/MongoBranchStoreRepository");
const logsMessages_1 = require("../../../../utils/LogHandle/logsMessages");
const AppError_1 = require("../../../../shared/errors/AppError");
class CreateEmployeeController {
    constructor() {
        this.createEmployeeUseCase = new CreateEmployeeUseCase_1.CreateEmployeeUseCase(new MongoEmployeeRepository_1.MongoEmployeeRepository(), new MongoSellerRepository_1.MongoSellerRepository(), new MongoBranchStoreRepository_1.MongoBranchStoreRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`POST simora/api/dashboard/staff/employee/create/`);
            try {
                // Destructing request
                const { name, lastName, DNI, branchStore, position } = req.body || {};
                // Execute function
                yield this.createEmployeeUseCase.execute({
                    name,
                    lastName,
                    DNI,
                    branchStore,
                    position,
                });
                // Response
                return res.status(201).json({
                    message: "Employee created successfully",
                    status: 201,
                });
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                }
                else {
                    (0, logsMessages_1.logError)(`Error creating employee: ${error.message}`);
                    return res.status(500).json({
                        message: `Error creating employee: ${error.message}`,
                    });
                }
            }
        });
    }
}
exports.CreateEmployeeController = CreateEmployeeController;
