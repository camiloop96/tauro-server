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
exports.LoginUseCase = void 0;
const passwordManager_1 = require("../../../../security/shared/passwordManager");
const tokenManager_1 = require("../../../../security/shared/tokenManager");
const AppError_1 = require("../../../../../shared/errors/AppError");
class LoginUseCase {
    constructor(credentialRepository, userRepository, roleRepository) {
        this.credentialRepository = credentialRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    execute(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Destructing credentials
                const { username, password } = credentials || {};
                // Check if username exist
                const existCredential = yield this.credentialRepository.getCredentialsByUsername(username);
                // Get user by credential
                const findUser = yield this.userRepository.getUserByCredential(existCredential === null || existCredential === void 0 ? void 0 : existCredential._id);
                // Compare hash password
                const comparePassword = yield (0, passwordManager_1.compareHashPassword)(password, existCredential.password);
                if (!comparePassword) {
                    throw new AppError_1.AppError("Invalid credentials", 401);
                }
                // Create token
                const payload = { userId: findUser._id, role: findUser.role };
                const token = (0, tokenManager_1.createToken)(payload);
                // Get role name
                let roleName;
                if (findUser !== undefined) {
                    roleName = yield this.roleRepository.getRoleByUserId(findUser._id);
                }
            }
            catch (error) {
                throw new AppError_1.AppError("Error login", 400);
            }
        });
    }
}
exports.LoginUseCase = LoginUseCase;
