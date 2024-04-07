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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyToken = exports.createToken = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Variables de entorno
(_a = (0, dotenv_1.config)()) === null || _a === void 0 ? void 0 : _a.parsed;
let JWT_SECRET = process.env.JWT_SECRET;
const createToken = (payload) => {
    // Verificar si el JWT_SECRET está definido
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET no está definido en las variables de entorno");
    }
    // Crear el token JWT con un vencimiento de 1 hora
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return token;
};
exports.createToken = createToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el JWT_SECRET está definido
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET no está definido en las variables de entorno");
    }
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (error, decodedToken) => {
            if (error) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
});
exports.verifyToken = verifyToken;
const decodeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!token) {
            throw new Error("Token no proporcionado");
        }
        // Decodificar el token
        const tokenDecoded = jsonwebtoken_1.default.decode(token);
        if (!tokenDecoded) {
            throw new Error("Token de autorización inválido");
        }
        return tokenDecoded;
    }
    catch (error) {
        throw error;
    }
});
exports.decodeToken = decodeToken;
