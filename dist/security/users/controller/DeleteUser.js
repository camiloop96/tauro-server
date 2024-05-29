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
exports.DeleteUserById = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const CredentialModel_1 = __importDefault(require("../../models/CredentialModel"));
const DeleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield UserModel_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const credential = yield CredentialModel_1.default.findOne({ user: user._id });
        if (credential) {
            yield CredentialModel_1.default.findByIdAndDelete(credential._id);
        }
        yield UserModel_1.default.findByIdAndDelete(id);
        res
            .status(200)
            .json({ message: "Usuario y credencial asociada eliminados con éxito" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.DeleteUserById = DeleteUserById;
