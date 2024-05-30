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
exports.CreateRoleUseCase = void 0;
const AppError_1 = require("../../../../../shared/errors/AppError");
class CreateRoleUseCase {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    execute(roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Destructing role data
            const { name, description } = roleData || {};
            // Exist Role
            let roleIsExist = yield this.roleRepository.getRoleByName(name);
            if (roleIsExist) {
                throw new AppError_1.AppError("Role is already exist", 400);
            }
            // Create role
            yield this.roleRepository.createRole({ name, description });
        });
    }
}
exports.CreateRoleUseCase = CreateRoleUseCase;
