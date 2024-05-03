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
exports.createRootUser = void 0;
const CredentialModel_1 = __importDefault(require("../security/models/CredentialModel"));
const RolesModel_1 = __importDefault(require("../security/roles/models/RolesModel"));
const UserModel_1 = __importDefault(require("../security/users/models/UserModel"));
const passwordManager_1 = require("../security/utils/passwordManager");
const createRootUser = () => __awaiter(void 0, void 0, void 0, function* () {
    let usernameMaster = "master@simora.co";
    let passwordMaster = "Empanada04$";
    let rolMaster = "master";
    let hashPassword = yield (0, passwordManager_1.generateHashPassword)(passwordMaster);
    try {
        let existingRole = yield RolesModel_1.default.exists({
            name: rolMaster,
        });
        let idRole;
        if (!existingRole) {
            idRole = new RolesModel_1.default({
                name: rolMaster,
            });
            idRole.save();
            console.log("Master role created succesfully");
        }
        else {
            console.log("Master role is now existing");
            idRole = yield RolesModel_1.default.findOne({
                name: rolMaster,
            });
        }
        const existMaster = yield CredentialModel_1.default.exists({
            username: usernameMaster,
        });
        if (!existMaster) {
            const masterUser = new UserModel_1.default({
                fullName: "Master",
                role: idRole && idRole._id,
            });
            if (masterUser) {
                const masterCredential = new CredentialModel_1.default({
                    username: usernameMaster,
                    password: hashPassword,
                    user: masterUser._id,
                });
                yield masterCredential.save();
            }
            yield masterUser.save();
            console.log("Master user created succesfully");
        }
        else {
            console.log("Master user is now existing");
        }
    }
    catch (error) {
        console.error("Error for create master user:", error);
    }
});
exports.createRootUser = createRootUser;
