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
exports.GetRoleFromTokenController = void 0;
const GetRoleFromTokenUseCase_1 = require("../../../../security/application/useCases/roles/GetRoleFromTokenUseCase");
const MongoRoleRepository_1 = require("../../repositories/MongoRoleRepository");
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
class GetRoleFromTokenController {
    constructor() {
        this.getRoleFromTokenUseCase = new GetRoleFromTokenUseCase_1.GetRoleFromTokenUseCase(new MongoRoleRepository_1.MongoRoleRepository(), new MongoUserRepository_1.MongoUserRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Destructing request
                let { token } = req.body || {};
                // Obtaining role
                const role = yield this.getRoleFromTokenUseCase.execute(token);
                // Return response
                return res.status(200).json(role);
            }
            catch (error) {
                (0, logsMessages_1.logError)(`Error obtaining role: ${error}`);
                return res
                    .status(500)
                    .json({ message: `Error obtaining role: ${error}` });
            }
        });
    }
}
exports.GetRoleFromTokenController = GetRoleFromTokenController;
