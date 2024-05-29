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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const UserModel_1 = __importDefault(require("@modules/security/infrastructure/models/UserModel"));
const AppError_1 = require("src/shared/errors/AppError");
class CreateUserUseCase {
    constructor(userRepository, employeeRepository, roleRepository, credentialsRepository) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
        this.credentialsRepository = credentialsRepository;
    }
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Existing user
                const existingEmployee = yield this.employeeRepository.getEmployeeById(userData.employee);
                // Existing user by employee id
                yield this.userRepository.isExistEmployeeUser(existingEmployee);
                // ExistingRole
                const existingRole = yield this.roleRepository.getRoleByName(userData.role);
                // Creating credential
                const createCredential = yield this.credentialsRepository.createCredential({
                    username: userData.username,
                    password: userData.password,
                });
                // Creating user
                const createUser = new UserModel_1.default({
                    employee: userData.employee,
                    role: existingRole,
                    credential: createCredential,
                });
                // Saving user
                yield createUser.save();
            }
            catch (error) {
                throw new AppError_1.AppError("Error creating user", 500);
            }
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
