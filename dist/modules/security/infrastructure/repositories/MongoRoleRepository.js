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
exports.MongoRoleRepository = void 0;
const RoleModel_1 = __importDefault(require("../models/RoleModel"));
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../../../shared/errors/AppError");
class MongoRoleRepository {
    // Obtaining role by user ID
    getRoleByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                const findRole = yield RoleModel_1.default.findById(id);
                if (!findRole) {
                    throw new AppError_1.AppError("Role not found", 404);
                }
                return findRole.name;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching roles", 500);
                }
            }
        });
    }
    // Check and parse ID
    checkAndParseID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                let parseID = new mongoose_1.Types.ObjectId(id);
                return parseID;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error parsing ID", 500);
                }
            }
        });
    }
    // Role existence
    roleIsExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                let roleExist = yield RoleModel_1.default.findById(id);
                if (roleExist) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new AppError_1.AppError("Error fetching role", 500);
            }
        });
    }
    // Detail role
    getDetailRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                let role = yield RoleModel_1.default.findById(id);
                if (!role) {
                    throw new AppError_1.AppError("Role not found", 404);
                }
                return role;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching role", 500);
                }
            }
        });
    }
    // Delete role
    deleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                yield RoleModel_1.default.findByIdAndDelete(id);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching roles", 500);
                }
            }
        });
    }
    // Update Role
    updateRole(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                if (Object.keys(payload).length === 0) {
                    throw new AppError_1.AppError("Role data cannot be empty", 400);
                }
                const updateRole = yield RoleModel_1.default.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true });
                if (!updateRole) {
                    throw new AppError_1.AppError("Role not found", 404);
                }
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching Roles", 500);
                }
            }
        });
    }
    // Obtaining role by name
    getRoleByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existRole = yield RoleModel_1.default.findOne({
                    name: name,
                });
                if (existRole) {
                    return existRole._id;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new AppError_1.AppError("Error fetching Roles", 500, error);
            }
        });
    }
    // Create role
    createRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Desctructing role
                const { name, description } = role || {};
                // Check if role is undefined
                if (!name) {
                    throw new AppError_1.AppError("Role name cannot be undefined", 400);
                }
                // Save role
                const newRole = new RoleModel_1.default({
                    name: name,
                    description: description,
                });
                yield newRole.save();
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error creating role", 500);
                }
            }
        });
    }
    // Obtaining role list
    getRoleList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get role list
                let roleList = yield RoleModel_1.default.find()
                    .select("-description -__v")
                    .exec();
                // return role list
                return roleList;
            }
            catch (error) {
                throw new AppError_1.AppError("Error getting role list", 500, error);
            }
        });
    }
}
exports.MongoRoleRepository = MongoRoleRepository;
