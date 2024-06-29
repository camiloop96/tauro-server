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
exports.DetailRoleController = void 0;
const DetailRoleUseCase_1 = require("../../../../security/application/useCases/roles/DetailRoleUseCase");
const MongoRoleRepository_1 = require("../../repositories/MongoRoleRepository");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
const AppError_1 = require("../../../../../shared/errors/AppError");
class DetailRoleController {
    constructor() {
        this.detailRoleUseCase = new DetailRoleUseCase_1.DetailRoleUseCase(new MongoRoleRepository_1.MongoRoleRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Destructuring request
                let { id } = req.params;
                // Obtain detail
                const roleDetail = yield this.detailRoleUseCase.execute(id);
                // Return detail
                return res.status(200).json(roleDetail);
            }
            catch (error) {
                // Error handle
                if (error instanceof AppError_1.AppError) {
                    res.status(error.statusCode).json({
                        message: error.message,
                        status: error.statusCode,
                    });
                }
                else {
                    (0, logsMessages_1.logError)(`Error obtaining role detail: ${error}`);
                    return res.status(500).json({
                        message: `Error obtaining role detail: ${error}`,
                    });
                }
            }
        });
    }
}
exports.DetailRoleController = DetailRoleController;
