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
exports.UpdateBranchStoreUseCase = void 0;
const AppError_1 = require("../../../../shared/errors/AppError");
class UpdateBranchStoreUseCase {
    constructor(branchStoreRepository) {
        this.branchStoreRepository = branchStoreRepository;
    }
    execute(branchStoreID, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check and parse ID
            const checkedAndParsedID = yield this.branchStoreRepository.checkAndParseID(branchStoreID);
            // Check if exist
            const branchStoreExist = yield this.branchStoreRepository.checkIfBranchStoreExist(checkedAndParsedID);
            if (!branchStoreExist) {
                throw new AppError_1.AppError("Branch Store not found", 404);
            }
            // Update Branch Store
            yield this.branchStoreRepository.updateBranchStore(checkedAndParsedID, payload);
        });
    }
}
exports.UpdateBranchStoreUseCase = UpdateBranchStoreUseCase;
