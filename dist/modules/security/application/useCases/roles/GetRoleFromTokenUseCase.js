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
exports.GetRoleFromTokenUseCase = void 0;
const AppError_1 = require("../../../../../shared/errors/AppError");
class GetRoleFromTokenUseCase {
    constructor(roleRepository, userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Decode token and obtain userID
                const userID = yield this.userRepository.getUserByToken(token);
                // Search userId in role list
                yield this.roleRepository.getRoleByUserId(userID);
            }
            catch (error) {
                throw new AppError_1.AppError("Error obtaining role from token", 400);
            }
        });
    }
}
exports.GetRoleFromTokenUseCase = GetRoleFromTokenUseCase;
