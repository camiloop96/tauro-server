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
exports.CreateUserController = void 0;
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const CreateUserUseCase_1 = require("../../../../security/application/useCases/user/CreateUserUseCase");
const MongoEmployeeRepository_1 = require("../../../../staff/infrastructure/repositories/MongoEmployeeRepository");
const MongoRoleRepository_1 = require("../../repositories/MongoRoleRepository");
const MongoCredentialRepository_1 = require("../../repositories/MongoCredentialRepository");
const MongoBranchStoreRepository_1 = require("../../../../store/infraestructure/repositories/MongoBranchStoreRepository");
class CreateUserController {
    constructor() {
        this.createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(new MongoUserRepository_1.MongoUserRepository(), new MongoEmployeeRepository_1.MongoEmployeeRepository(), new MongoRoleRepository_1.MongoRoleRepository(), new MongoCredentialRepository_1.MongoCredentialRepository(), new MongoBranchStoreRepository_1.MongoBranchStoreRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { employee, username, role, password } = req.body;
                yield this.createUserUseCase.execute({
                    employee,
                    role,
                    username,
                    password,
                });
                res.status(201).send("User created successfully");
            }
            catch (error) {
                console.error("Error creating user:", error);
                res.status(500).send("Error creating user");
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
exports.default = new CreateUserController();
