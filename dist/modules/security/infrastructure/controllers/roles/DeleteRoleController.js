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
exports.DeleteRoleController = void 0;
const DeleteRoleUseCase_1 = require("../../../../security/application/useCases/roles/DeleteRoleUseCase");
const MongoRoleRepository_1 = require("../../repositories/MongoRoleRepository");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
const AppError_1 = require("../../../../../shared/errors/AppError");
class DeleteRoleController {
    // Constructor
    constructor() {
        this.deleteRoleUseCase = new DeleteRoleUseCase_1.DeleteRoleUseCase(new MongoRoleRepository_1.MongoRoleRepository());
    }
    // Function excecute
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`DELETE simora/api/dashboard/security/role/delete/${req.params.id}/`);
            try {
                // Request destructing
                const { id } = req.params || {};
                // Delete role
                yield this.deleteRoleUseCase.execute(id);
                // Return response
                return res.status(200).json({
                    message: `Role delete successfuly`,
                    status: 200,
                });
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
                    (0, logsMessages_1.logError)(`Error deleting role: ${error}`);
                    return res.status(500).json({
                        message: `Error deleting role: ${error}`,
                    });
                }
            }
        });
    }
}
exports.DeleteRoleController = DeleteRoleController;
