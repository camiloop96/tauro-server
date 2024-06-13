"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CreateRootUserUseCase = void 0;
const AppError_1 = require("../../../../../shared/errors/AppError");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
const dotenv_1 = require("dotenv");
const RootConfigJSON = __importStar(require("../../../../../shared/rootData/UserRootData.json"));
(0, dotenv_1.config)().parsed;
const { MASTER_USERNAME, MASTER_PASSWORD, MASTER_ROLE } = process.env || {};
class CreateRootUserUseCase {
    constructor(userRepository, employeeRepository, credentialRepository, roleRepository, branchStoreRepository, usernameMaster = MASTER_USERNAME, passwordMaster = MASTER_PASSWORD, roleMaster = MASTER_ROLE) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.credentialRepository = credentialRepository;
        this.roleRepository = roleRepository;
        this.branchStoreRepository = branchStoreRepository;
        this.usernameMaster = usernameMaster;
        this.passwordMaster = passwordMaster;
        this.roleMaster = roleMaster;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeMasterData = this.getEmployeeMasterData();
            this.checkEnvVariables();
            const createRole = yield this.createRoleIfNotExist(this.roleMaster);
            // Branch Store
            const createBranchStore = yield this.createBranchStoreIfNotExist(employeeMasterData.branchStore);
            // Create Employee
            const employeeExist = yield this.employeeRepository.employeeExistByDNI(employeeMasterData.DNI);
            let newEmployee;
            if (employeeExist) {
                (0, logsMessages_1.logSuccess)("Master employee is already exists");
            }
            else {
                newEmployee = yield this.createEmployeeIfNotExist(employeeMasterData, createBranchStore);
                (0, logsMessages_1.logSuccess)("Master employee initialized");
                yield this.createCredentialIfNotExist(newEmployee, createRole, this.usernameMaster, this.passwordMaster);
                yield this.employeeRepository.saveEmployee(newEmployee);
            }
        });
    }
    getEmployeeMasterData() {
        try {
            return JSON.parse(JSON.stringify(RootConfigJSON));
        }
        catch (error) {
            throw new AppError_1.AppError(`Error obtaining JSON config`, 500, error);
        }
    }
    checkEnvVariables() {
        if (!this.roleMaster || !this.passwordMaster || !this.usernameMaster) {
            throw new AppError_1.AppError("ENV variables are not defined", 400);
        }
    }
    createRoleIfNotExist(roleMaster) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleExist = yield this.roleRepository.getRoleByName(roleMaster);
            if (roleExist) {
                (0, logsMessages_1.logSuccess)("Role master is already exists");
                return roleExist;
            }
            else {
                const newRole = yield this.roleRepository.createRootRole(roleMaster);
                (0, logsMessages_1.logSuccess)("Role master initialized");
                return newRole;
            }
        });
    }
    createBranchStoreIfNotExist(branchStoreData) {
        return __awaiter(this, void 0, void 0, function* () {
            const branchStoreExist = yield this.branchStoreRepository.checkIfBranchStoreExistByName(branchStoreData === null || branchStoreData === void 0 ? void 0 : branchStoreData.name);
            if (branchStoreExist) {
                (0, logsMessages_1.logSuccess)("Branch store is already exist");
                return;
            }
            else {
                const newBranchStore = yield this.branchStoreRepository.createRootBranchStore({
                    name: branchStoreData.name,
                    state: branchStoreData.state,
                    city: branchStoreData.city,
                });
                return newBranchStore;
            }
        });
    }
    createEmployeeIfNotExist(employeeData, branchStore) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = yield this.employeeRepository.createEmployee({
                name: employeeData.name,
                lastName: employeeData.lastName,
                DNI: employeeData.DNI,
                branchStore: branchStore._id,
                position: employeeData.position,
            });
            return newEmployee;
        });
    }
    createCredentialIfNotExist(newEmployee, createRole, usernameMaster, passwordMaster) {
        return __awaiter(this, void 0, void 0, function* () {
            const usernameExist = yield this.credentialRepository.credentialIsExist(usernameMaster);
            if (usernameExist) {
                (0, logsMessages_1.logSuccess)("User is already exists");
            }
            else {
                const createCredential = yield this.credentialRepository.createRootCredential({
                    username: usernameMaster,
                    password: passwordMaster,
                });
                yield this.userRepository.createRootUser({
                    employee: newEmployee._id,
                    role: createRole,
                    credential: createCredential._id,
                });
                (0, logsMessages_1.logSuccess)("Root user initialized");
            }
        });
    }
}
exports.CreateRootUserUseCase = CreateRootUserUseCase;
