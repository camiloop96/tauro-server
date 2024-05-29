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
const AppError_1 = require("src/shared/errors/AppError");
const RoleModel_1 = __importDefault(require("../models/RoleModel"));
const mongoose_1 = require("mongoose");
class MongoRoleRepository {
    getRoleByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existRole = yield RoleModel_1.default.findOne({
                    name: name,
                });
                if (!existRole) {
                    throw new AppError_1.AppError("Role not found", 404);
                }
                return existRole._id;
            }
            catch (error) {
                throw new AppError_1.AppError("Error fetching Roles", 500);
            }
        });
    }
    createRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if role is undefined
                if (!role.name) {
                    throw new AppError_1.AppError("Role cannot be undefined", 400);
                }
                // Check if role is a valid ObjectId
                if (!(0, mongoose_1.isValidObjectId)(role.name)) {
                    throw new AppError_1.AppError("Role name must be a valid ObjectId", 400);
                }
                // Save role
                const newRole = new RoleModel_1.default({
                    name: role.name,
                });
                yield newRole.save();
            }
            catch (error) {
                throw new AppError_1.AppError("Error creating role", 500);
            }
        });
    }
    listRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get role list
                let roleList = yield RoleModel_1.default.find();
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
