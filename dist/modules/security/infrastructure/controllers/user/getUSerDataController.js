"use strict";
/**
 * @file GetUserDataController.ts
 * @description Controller responsible for handling requests to fetch user data by token.
 */
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
exports.GetUserDataController = void 0;
const MongoUserRepository_1 = require("../../repositories/MongoUserRepository");
const logsMessages_1 = require("../../../../../utils/LogHandle/logsMessages");
const AppError_1 = require("../../../../../shared/errors/AppError");
const GetUserDataUseCase_1 = require("../../../../security/application/useCases/user/GetUserDataUseCase");
const MongoEmployeeRepository_1 = require("../../../../staff/infrastructure/repositories/MongoEmployeeRepository");
const MongoBranchStoreRepository_1 = require("../../../../store/infraestructure/repositories/MongoBranchStoreRepository");
const MongoSellerRepository_1 = require("../../../../staff/infrastructure/repositories/MongoSellerRepository");
/**
 * Controller class handling requests to fetch user data by token.
 */
class GetUserDataController {
    /**
     * Creates an instance of GetUserDataController.
     */
    constructor() {
        this.getUserDataUseCase = new GetUserDataUseCase_1.GetUserDataUseCase(new MongoUserRepository_1.MongoUserRepository(), new MongoEmployeeRepository_1.MongoEmployeeRepository(), new MongoBranchStoreRepository_1.MongoBranchStoreRepository(), new MongoSellerRepository_1.MongoSellerRepository());
    }
    /**
     * Executes the request to fetch user data by token.
     *
     * @param {Request} req - The Express Request object.
     * @param {Response} res - The Express Response object.
     * @returns {Promise<void>} A promise that resolves when the request is handled.
     */
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logsMessages_1.logSuccess)(`POST simora/api/dashboard/security/user/data/by-token/`);
            const { token } = req.body || {};
            try {
                const userData = yield this.getUserDataUseCase.execute(token);
                res.status(200).json(userData);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    res.status(error.statusCode).json({
                        message: error.message,
                        status: error.statusCode,
                    });
                }
                else {
                    (0, logsMessages_1.logError)(`Error fetching user data: ${error}`);
                    res.status(500).json({ message: `Error fetching user data: ${error}` });
                }
            }
        });
    }
}
exports.GetUserDataController = GetUserDataController;
// Export a singleton instance of the controller
exports.default = new GetUserDataController();
