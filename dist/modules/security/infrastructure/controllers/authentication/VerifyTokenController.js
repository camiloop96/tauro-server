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
exports.VerifyTokenController = void 0;
const VerifyTokenUseCase_1 = require("../../../../security/application/useCases/authentication/VerifyTokenUseCase");
const JWTAuthenticationRepository_1 = require("../../repositories/JWTAuthenticationRepository");
const AppError_1 = require("../../../../../shared/errors/AppError");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
class VerifyTokenController {
    constructor() {
        this.verifyTokenUseCase = new VerifyTokenUseCase_1.VerifyTokenUseCase(new JWTAuthenticationRepository_1.JWTAuthenticationRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`POST simora/api/dashboard/security/authentication/token/verify/`);
            try {
                const { token } = req.body || {};
                const verifyTokenResponse = yield this.verifyTokenUseCase.execute(token);
                return res.status(200).json({
                    isValid: verifyTokenResponse,
                    status: 200,
                });
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json({
                        message: error.message,
                        status: error.statusCode,
                    });
                }
                else {
                    (0, logsMessages_1.logError)(`Error verifing token: ${error.message}`);
                    res.status(500).send(`Error verifing token: ${error.message}`);
                }
            }
        });
    }
}
exports.VerifyTokenController = VerifyTokenController;
