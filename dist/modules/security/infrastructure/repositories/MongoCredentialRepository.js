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
exports.MongoCredentialRepository = void 0;
const CredentialModel_1 = __importDefault(require("../models/CredentialModel"));
const passwordManager_1 = require("../../../security/shared/passwordManager");
const AppError_1 = require("../../../../shared/errors/AppError");
class MongoCredentialRepository {
    credentialIsExist(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existCredential = yield CredentialModel_1.default.findOne({
                    username: username,
                });
                if (existCredential) {
                    return true;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching credentials", 500, error);
                }
            }
        });
    }
    createRootCredential(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = credential || {};
                // Hash password
                const hashPassword = yield (0, passwordManager_1.generateHashPassword)(password);
                // Create credential
                const newCredential = new CredentialModel_1.default({
                    username: username,
                    password: hashPassword,
                });
                // Save credential
                const saveCredential = yield newCredential.save();
                // Return
                return saveCredential._id;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error creating root credentials", 500);
                }
            }
        });
    }
    getCredentialsByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existCredential = yield CredentialModel_1.default.findOne({
                    username: username,
                });
                if (!existCredential) {
                    throw new AppError_1.AppError("Invalid credentials", 401);
                }
                return existCredential;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching credentials", 500);
                }
            }
        });
    }
    createCredential(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Destructing params
                let { username, password } = credential || {};
                // Check is username is already exist
                const isExistUsername = yield CredentialModel_1.default.findOne({
                    username: username,
                });
                if (isExistUsername) {
                    throw new AppError_1.AppError("Username is already in use", 400);
                }
                // Hash password
                const hashPassword = yield (0, passwordManager_1.generateHashPassword)(password);
                // Create Credential
                const newCredential = new CredentialModel_1.default({
                    username: username,
                    password: hashPassword,
                });
                // Save credential
                let save = yield newCredential.save();
                // Return id
                return save._id;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error creating credential", 500, error);
                }
            }
        });
    }
}
exports.MongoCredentialRepository = MongoCredentialRepository;
