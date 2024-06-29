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
exports.CreateRootUserController = void 0;
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const MongoEmployeeRepository_1 = require("../../../../staff/infrastructure/repositories/MongoEmployeeRepository");
const MongoRoleRepository_1 = require("../../repositories/MongoRoleRepository");
const MongoCredentialRepository_1 = require("../../repositories/MongoCredentialRepository");
const MongoBranchStoreRepository_1 = require("../../../../store/infraestructure/repositories/MongoBranchStoreRepository");
const CreateRootUserUseCase_1 = require("../../../../security/application/useCases/user/CreateRootUserUseCase");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
class CreateRootUserController {
    constructor() {
        this.createRootUserUseCase = new CreateRootUserUseCase_1.CreateRootUserUseCase(new MongoUserRepository_1.MongoUserRepository(), new MongoEmployeeRepository_1.MongoEmployeeRepository(), new MongoCredentialRepository_1.MongoCredentialRepository(), new MongoRoleRepository_1.MongoRoleRepository(), new MongoBranchStoreRepository_1.MongoBranchStoreRepository());
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.createRootUserUseCase.execute();
                (0, logsMessages_1.logSuccess)("Root user initialized successfully");
            }
            catch (error) {
                (0, logsMessages_1.logError)(`Error creating user: ${error.message}`);
            }
        });
    }
}
exports.CreateRootUserController = CreateRootUserController;
exports.default = new CreateRootUserController();
