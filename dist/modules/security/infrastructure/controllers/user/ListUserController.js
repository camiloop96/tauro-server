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
exports.ListUserController = void 0;
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const ListUserUseCase_1 = require("../../../../security/application/useCases/user/ListUserUseCase");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
const AppError_1 = require("../../../../../shared/errors/AppError");
class ListUserController {
    constructor() {
        this.listUserUseCase = new ListUserUseCase_1.ListUserUseCase(new MongoUserRepository_1.MongoUserRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.listUserUseCase.execute();
                res.status(200).json(users);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json({
                        message: error.message,
                        status: error.statusCode,
                    });
                }
                else {
                    (0, logsMessages_1.logError)(`Error creating user: ${error}`);
                    return res.status(500).json({ message: "Error creating user" });
                }
            }
        });
    }
}
exports.ListUserController = ListUserController;
exports.default = new ListUserController();
