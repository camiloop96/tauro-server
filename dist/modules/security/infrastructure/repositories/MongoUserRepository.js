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
const tokenManager_1 = require("../../../security/shared/tokenManager");
class MongoUserRepository {
    getUserByCredential(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!credential || !(0, mongoose_1.isValidObjectId)(credential)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                const existCredential = yield UserModel_1.default.findOne({
                    credential: credential,
                });
                if (!existCredential) {
                    throw new AppError_1.AppError("Invalid credentials", 404);
                }
                return existCredential;
            }
            catch (error) {
                throw new AppError_1.AppError("Error fetching user", 500);
            }
        });
    }
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check missing token
                if (!token) {
                    throw new AppError_1.AppError("Missing token", 400);
                }
                // Decode token
                const decodedToken = yield (0, tokenManager_1.decodeToken)(token);
                if (!decodedToken) {
                    throw new AppError_1.AppError("Token not valid", 400);
                }
                // Search User
                const userId = decodedToken.userId;
                const findUser = yield UserModel_1.default.findById(userId);
                if (!findUser) {
                    throw new AppError_1.AppError("User not found", 404);
                }
                return findUser._id;
            }
            catch (error) {
                throw new AppError_1.AppError("Error fetching user", 500);
            }
        });
    }
    getUsersByRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check is valid ID
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                // Find User list
                let userList = yield UserModel_1.default.find({
                    role: id,
                });
                return userList;
            }
            catch (error) {
                throw new AppError_1.AppError("Error fetching users", 400, error);
            }
        });
    }
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
                    return true;
                }
                else {
                    return false;
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
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new UserModel_1.default({
                    employee: user.employee,
                    role: user.role,
                    credential: user.credential,
                });
                yield newUser.save();
            }
            catch (error) {
                throw new AppError_1.AppError("Error saving user", 500);
            }
        });
    }
}
exports.MongoUserRepository = MongoUserRepository;
