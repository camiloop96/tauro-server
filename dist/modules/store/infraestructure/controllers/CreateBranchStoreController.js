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
exports.CreateBranchStoreController = void 0;
const CreateBranchStoreUseCase_1 = require("../../../store/application/useCases/CreateBranchStoreUseCase");
const MongoBranchStoreRepository_1 = require("../repositories/MongoBranchStoreRepository");
const logsMessages_1 = require("../../../../utils/LogHandle/logsMessages");
const AppError_1 = require("../../../../shared/errors/AppError");
class CreateBranchStoreController {
    constructor() {
        this.createBranchStoreUseCase = new CreateBranchStoreUseCase_1.CreateBranchStoreUseCase(new MongoBranchStoreRepository_1.MongoBranchStoreRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`POST simora/api/dashboard/store/branch/create/`);
            try {
                const { name, state, city } = req.body || {};
                yield this.createBranchStoreUseCase.execute({ name, state, city });
                return res.status(201).json({
                    message: "Branch Store created successfully",
                    status: 201,
                });
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json({
                        message: error.message,
                        status: error.statusCode,
                    });
                }
                else {
                    (0, logsMessages_1.logError)(`Error creating Branch Store: ${error.message}`);
                    return res.status(500).json({
                        message: `Error creating Branch Store: ${error.message}`,
                    });
                }
            }
        });
    }
}
exports.CreateBranchStoreController = CreateBranchStoreController;
