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
exports.LoginController = void 0;
const CredentialModel_1 = __importDefault(require("../../models/CredentialModel"));
const passwordManager_1 = require("../../utils/passwordManager");
const UserModel_1 = __importDefault(require("../../users/models/UserModel"));
const tokenManager_1 = require("../../utils/tokenManager");
const dateManager_1 = require("../../../utils/dateManager");
const RolesModel_1 = __importDefault(require("../../roles/models/RolesModel"));
const LoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} ${req.method} simora/api/authentication/security/authentication/login/`);
    try {
        const { username, password } = req.body;
        // Verificar si se proporcionó un correo electrónico
        if (!username) {
            return res.status(400).json({ error: "Por favor, ingrese un usuario" });
        }
        // Verificar si se proporcionó una contraseña
        if (!password) {
            return res
                .status(400)
                .json({ error: "Por favor, ingrese una contraseña" });
        }
        // Verificar si el correo electrónico existe
        const credentials = yield CredentialModel_1.default.findOne({ username });
        if (!credentials) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        // Verificar la contraseña
        const passwordMatch = yield (0, passwordManager_1.compareHashPassword)(password, credentials.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        // Obtener el usuario asociado a las credenciales
        const user = yield UserModel_1.default.findById(credentials.user);
        // Validar existencia de usuario
        if (!user) {
            return res.status(403).json({
                error: "Credenciales inválidas",
            });
        }
        // Creacción del token
        let token;
        if (user !== null) {
            let payload = { userId: user._id, role: user === null || user === void 0 ? void 0 : user.role };
            token = (0, tokenManager_1.createToken)(payload);
        }
        // Busqueda de nombre de rol
        let existingRole = yield RolesModel_1.default.findById(user === null || user === void 0 ? void 0 : user.role);
        // Respuesta
        res.status(200).json({ token, role: existingRole && (existingRole === null || existingRole === void 0 ? void 0 : existingRole.name) });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.LoginController = LoginController;
