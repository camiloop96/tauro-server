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
exports.CreateBranchStoreUseCase = void 0;
class CreateBranchStoreUseCase {
    constructor(branchStoreRepository) {
        this.branchStoreRepository = branchStoreRepository;
    }
    execute(branchStoreData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Destructing request
            const { name, state, city } = branchStoreData || {};
            // Save Branch Store
            yield this.branchStoreRepository.createBranchStore({ name, state, city });
        });
    }
}
exports.CreateBranchStoreUseCase = CreateBranchStoreUseCase;