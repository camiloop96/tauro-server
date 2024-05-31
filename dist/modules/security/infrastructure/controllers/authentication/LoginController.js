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
exports.LoginController = void 0;
const LoginUseCase_1 = require("../../../../security/application/useCases/authentication/LoginUseCase");
const JWTAuthenticationRepository_1 = require("../../repositories/JWTAuthenticationRepository");
const MongoCredentialRepository_1 = require("../../repositories/MongoCredentialRepository");
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const MongoRoleRepository_1 = require("../../repositories/MongoRoleRepository");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
const AppError_1 = require("../../../../../shared/errors/AppError");
class LoginController {
    constructor() {
        this.loginUseCase = new LoginUseCase_1.LoginUseCase(new MongoCredentialRepository_1.MongoCredentialRepository(), new MongoUserRepository_1.MongoUserRepository(), new MongoRoleRepository_1.MongoRoleRepository(), new JWTAuthenticationRepository_1.JWTAuthenticationRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`POST simora/api/dashboard/security/authentication/login/`);
            try {
                let { username, password } = req.body || {};
                let loginResponse = yield this.loginUseCase.execute({
                    username,
                    password,
                });
                return res.status(200).json(loginResponse);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json({
                        message: error.message,
                        status: error.statusCode,
                    });
                }
                else {
                    (0, logsMessages_1.logError)(`Error login: ${error.message}`);
                    res.status(500).send(`Error login: ${error.message}`);
                }
            }
        });
    }
}
exports.LoginController = LoginController;
