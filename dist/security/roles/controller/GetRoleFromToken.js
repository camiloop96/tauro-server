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
exports.GetRoleFromToken = void 0;
const RolesModel_1 = __importDefault(require("../models/RolesModel"));
const UserModel_1 = __importDefault(require("../../users/models/UserModel"));
const tokenManager_1 = require("../../utils/tokenManager");
const GetRoleFromToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        if (!token) {
            return res
                .status(400)
                .json({ message: "Token no proporcionado en la solicitud" });
        }
        const decodedToken = yield (0, tokenManager_1.decodeToken)(token);
        if (!decodedToken) {
            return res.status(401).json({ message: "Token inválido" });
        }
        const user = yield UserModel_1.default.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        let userRole = yield RolesModel_1.default.findById(user.role);
        if (!userRole) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        res.status(200).json({ role: userRole.name });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener el rol del usuario",
            error: error.message,
        });
    }
});
exports.GetRoleFromToken = GetRoleFromToken;
