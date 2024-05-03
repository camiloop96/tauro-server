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
exports.GetUsersByRole = void 0;
const UserModel_1 = __importDefault(require("../../users/models/UserModel"));
const GetUsersByRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleId = req.params.roleId;
        if (!roleId) {
            return res
                .status(400)
                .json({ message: "Se requiere roleId en los parámetros" });
        }
        const users = yield UserModel_1.default.find({
            roles: roleId,
        }).select("firstName lastName position");
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.GetUsersByRole = GetUsersByRole;
