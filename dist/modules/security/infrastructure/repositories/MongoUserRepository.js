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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserRepository = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = require("src/shared/errors/AppError");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const CredentialModel_1 = __importDefault(require("../models/CredentialModel"));
class MongoUserRepository {
    isExistEmployeeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                let existEmployeeUser = yield UserModel_1.default.findOne({
                    employee: id,
                });
                if (existEmployeeUser) {
                    throw new AppError_1.AppError("The employee already has an associated user", 400);
                }
                else {
                    return;
                }
            }
            catch (error) {
                throw new AppError_1.AppError("Error fetching employee", 500);
            }
        });
    }
    getByEmployeeId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if is valid ID
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Invalid or missing ID", 400);
                }
                // Check if user exist
                const existUser = yield UserModel_1.default.findById(id);
                if (!existUser) {
                    throw new AppError_1.AppError("User not found", 404);
                }
                // Return user object
                return existUser;
            }
            catch (error) {
                throw new AppError_1.AppError("Error fetching user", 500, error);
            }
        });
    }
    getList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userList = yield UserModel_1.default.find();
                return userList;
            }
            catch (error) {
                throw new AppError_1.AppError("Error fetching user", 500);
            }
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCredential = new CredentialModel_1.default({
                username: user.username,
                password: user.password,
            });
            const newUser = new UserModel_1.default({
                employee: user.employee,
                role: user.role,
                credential: newCredential._id,
            });
            yield newUser.save();
            yield newCredential.save();
        });
    }
}
exports.MongoUserRepository = MongoUserRepository;
