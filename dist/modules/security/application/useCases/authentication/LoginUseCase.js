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
const AppError_1 = require("../../../../../shared/errors/AppError");
class LoginUseCase {
    constructor(credentialRepository, userRepository, roleRepository, authenticationRepository) {
        this.credentialRepository = credentialRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.authenticationRepository = authenticationRepository;
    }
    execute(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            // Destructing credentials
            const { username, password } = credentials || {};
            // Check if username exist
            const existCredential = yield this.credentialRepository.getCredentialsByUsername(username);
            console.log(existCredential);
            // Get user by credential
            const findUser = yield this.userRepository.getUserByCredential(existCredential === null || existCredential === void 0 ? void 0 : existCredential._id);
            console.log(findUser);
            // Compare hash password
            const comparePassword = yield (0, passwordManager_1.compareHashPassword)(password, existCredential.password);
            if (!comparePassword) {
                throw new AppError_1.AppError("Invalid credentials", 401);
            }
            // Create token
            const payload = { userId: findUser._id, role: findUser.role };
            const token = yield this.authenticationRepository.createToken(payload);
            if (!token) {
                throw new AppError_1.AppError("Token generation failed", 500);
            }
            // Get role name
            let roleName = yield this.roleRepository.getRoleByUserId(findUser._id);
            if (!roleName) {
                throw new AppError_1.AppError("Role not found", 404);
            }
            return {
                token: token,
                role: roleName,
            };
        });
    }
}
exports.LoginUseCase = LoginUseCase;
