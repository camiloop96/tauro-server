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
exports.CreateRoleController = void 0;
const MongoRoleRepository_1 = require("../../repositories/MongoRoleRepository");
const CreateRoleUseCase_1 = require("../../../../security/application/useCases/roles/CreateRoleUseCase");
const AppError_1 = require("../../../../../shared/errors/AppError");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
class CreateRoleController {
    constructor() {
        this.createRoleUseCase = new CreateRoleUseCase_1.CreateRoleUseCase(new MongoRoleRepository_1.MongoRoleRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`POST simora/api/dashboard/security/role/create/`);
            try {
                const { name, description } = req.body;
                yield this.createRoleUseCase.execute({
                    name,
                    description,
                });
                res
                    .status(201)
                    .send({ message: "Role created successfully", status: 201 });
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    res.status(error.statusCode).json({
                        message: error.message,
                        status: error.statusCode,
                    });
                }
                else {
                    (0, logsMessages_1.logError)(`Error creating role: ${error.message}`);
                    res.status(500).send(`Error creating role: ${error.message}`);
                }
            }
        });
    }
}
exports.CreateRoleController = CreateRoleController;
exports.default = new CreateRoleController();
