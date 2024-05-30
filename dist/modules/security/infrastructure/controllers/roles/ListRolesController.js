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
exports.ListRolesController = void 0;
const ListRolesUseCase_1 = require("../../../../security/application/useCases/roles/ListRolesUseCase");
const MongoRoleRepository_1 = require("../../repositories/MongoRoleRepository");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
class ListRolesController {
    constructor() {
        this.listRolesUseCase = new ListRolesUseCase_1.ListRolesUseCase(new MongoRoleRepository_1.MongoRoleRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`GET simora/api/dashboard/security/role/list/`);
            try {
                // Obtaining role list
                const roles = yield this.listRolesUseCase.execute();
                // Return role list
                res.status(200).json(roles);
            }
            catch (error) {
                // Error handle
                (0, logsMessages_1.logError)(`Error obtaining role list: ${error}`);
                return res.status(500).json({
                    message: "Error obtaining role list",
                });
            }
        });
    }
}
exports.ListRolesController = ListRolesController;
