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
exports.DeleteBranchStoreController = void 0;
const MongoBranchStoreRepository_1 = require("../repositories/MongoBranchStoreRepository");
const logsMessages_1 = require("../../../../utils/LogHandle/logsMessages");
const AppError_1 = require("../../../../shared/errors/AppError");
const DeleteBranchStoreUseCase_1 = require("../../../store/application/useCases/DeleteBranchStoreUseCase");
class DeleteBranchStoreController {
    constructor() {
        this.deleteBranchStoreUseCase = new DeleteBranchStoreUseCase_1.DeleteBranchStoreUseCase(new MongoBranchStoreRepository_1.MongoBranchStoreRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`DELETE simora/api/dashboard/store/branch/delete/${req.params.id}`);
            try {
                const { id } = req.params || {};
                yield this.deleteBranchStoreUseCase.execute(id);
                return res.status(201).json({
                    message: "Branch Store deleted successfully",
                    status: 200,
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
                    (0, logsMessages_1.logError)(`Error deleting Branch Store: ${error.message}`);
                    return res.status(500).json({
                        message: `Error deleting Branch Store: ${error.message}`,
                    });
                }
            }
        });
    }
}
exports.DeleteBranchStoreController = DeleteBranchStoreController;
