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
const ListUserUseCase_1 = require("@modules/security/application/useCases/user/ListUserUseCase");
class ListUserController {
    constructor() {
        this.listUserUseCase = new ListUserUseCase_1.ListUserUseCase(new MongoUserRepository_1.MongoUserRepository());
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.listUserUseCase.execute();
                res.status(200).send(users);
            }
            catch (error) {
                console.error("Error creating user:", error);
                res.status(500).send("Error creating user");
            }
        });
    }
}
exports.ListUserController = ListUserController;
exports.default = new ListUserController();
