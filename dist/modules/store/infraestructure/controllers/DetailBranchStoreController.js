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
exports.DetailBranchStoreController = void 0;
const MongoBranchStoreRepository_1 = require("../repositories/MongoBranchStoreRepository");
const logsMessages_1 = require("../../../../utils/LogHandle/logsMessages");
const AppError_1 = require("../../../../shared/errors/AppError");
const DetailBranchStoreUseCase_1 = require("../../../store/application/useCases/DetailBranchStoreUseCase");
class DetailBranchStoreController {
    constructor() {
        this.detailBranchStoreUseCase = new DetailBranchStoreUseCase_1.DetailBranchStoreUseCase(new MongoBranchStoreRepository_1.MongoBranchStoreRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`GET simora/api/dashboard/store/branch/detail/${req.params.id}`);
            try {
                const { id } = req.params || {};
                const branchStoreDetail = yield this.detailBranchStoreUseCase.execute(id);
                return res.status(200).json(branchStoreDetail);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json({
                        message: error.message,
                        status: error.statusCode,
                    });
                }
                else {
                    (0, logsMessages_1.logError)(`Error obtaining Branch Store detail: ${error.message}`);
                    return res.status(500).json({
                        message: `Error obtaining Branch Store detail: ${error.message}`,
                    });
                }
            }
        });
    }
}
exports.DetailBranchStoreController = DetailBranchStoreController;
