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
exports.CreateUser = void 0;
const CredentialModel_1 = __importDefault(require("../../models/CredentialModel"));
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const passwordManager_1 = require("../../utils/passwordManager");
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, username, password } = req.body;
        // Verificar si se proporcionó la contraseña
        if (!fullName) {
            return res.status(400).json({
                message: "El nombre es obligatorio",
            });
        }
        // Verificar si se proporcionó la contraseña
        if (!username) {
            return res.status(400).json({
                message: "El usuario es obligatorio",
            });
        }
        // Verificar si se proporcionó la contraseña
        if (!password) {
            return res.status(400).json({
                message: "La contraseña es obligatoria",
            });
        }
        // Verificar si ya existe un usuario con el correo electrónico
        const existingCredentials = yield CredentialModel_1.default.findOne({ username });
        if (existingCredentials) {
            res.status(400).json({ message: "El correo electrónico ya está en uso" });
            return;
        }
        // Cifrar la contraseña con bcrypt
        const hashedPassword = yield (0, passwordManager_1.generateHashPassword)(password);
        // Crear el usuario
        const user = new UserModel_1.default({ fullName });
        const newUser = yield user.save();
        // Crear las credenciales con la contraseña cifrada
        const credentials = new CredentialModel_1.default({
            username,
            password: hashedPassword,
            user: newUser._id,
        });
        yield credentials.save();
        res.status(200).json({ ok: true, message: "Usuario creado" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.CreateUser = CreateUser;
