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
exports.ListBranchStoreController = void 0;
const GetBranchStoreListUseCase_1 = require("../../../store/application/useCases/GetBranchStoreListUseCase");
const MongoBranchStoreRepository_1 = require("../repositories/MongoBranchStoreRepository");
const AppError_1 = require("../../../../shared/errors/AppError");
const logsMessages_1 = require("../../../../utils/LogHandle/logsMessages");
class ListBranchStoreController {
    constructor() {
        this.listBranchStoreUseCase = new GetBranchStoreListUseCase_1.ListBranchStoreUseCase(new MongoBranchStoreRepository_1.MongoBranchStoreRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`GET simora/api/dashboard/store/branch/list/`);
            try {
                const listBranchStore = yield this.listBranchStoreUseCase.execute();
                return res.status(200).json(listBranchStore);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json({
                        message: error.message,
                        status: error.statusCode,
                    });
                }
                else {
                    return res.status(500).json({
                        error: `Error obtaining Branch Store list: ${error.message}`,
                    });
                }
            }
        });
    }
}
exports.ListBranchStoreController = ListBranchStoreController;
