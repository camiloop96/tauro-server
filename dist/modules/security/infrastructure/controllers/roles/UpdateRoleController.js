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
exports.UpdateRoleController = void 0;
const UpdateRoleUseCase_1 = require("../../../../security/application/useCases/roles/UpdateRoleUseCase");
const MongoRoleRepository_1 = require("../../repositories/MongoRoleRepository");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
const AppError_1 = require("../../../../../shared/errors/AppError");
class UpdateRoleController {
    constructor() {
        this.updateRoleUseCase = new UpdateRoleUseCase_1.UpdateRoleUseCase(new MongoRoleRepository_1.MongoRoleRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`PUT simora/api/dashboard/security/role/update/${req.params.id}/`);
            try {
                // Destructing request
                let { id } = req.params;
                let payload = req.body;
                // Updating role
                yield this.updateRoleUseCase.execute(id, payload);
                // Return response
                return res.status(200).json({
                    message: `Role updated successfully`,
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
                    (0, logsMessages_1.logError)(`Error updating role: ${error}`);
                    return res.status(500).json({
                        message: `Error updating role: ${error}`,
                    });
                }
            }
        });
    }
}
exports.UpdateRoleController = UpdateRoleController;
