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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const dotenv_1 = require("dotenv");
const JWTAuthenticationRepository_1 = require("../modules/security/infrastructure/repositories/JWTAuthenticationRepository");
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Variables de entorno
    (_a = (0, dotenv_1.config)()) === null || _a === void 0 ? void 0 : _a.parsed;
    let JWT_SECRET = process.env.JWT_SECRET;
    try {
        const tokenManager = new JWTAuthenticationRepository_1.JWTAuthenticationRepository();
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Acceso denegado" });
        }
        const tokenParts = token.split(" ");
        const tokenFormatted = tokenParts[1];
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET no está definido en las variables de entorno");
        }
        // Validación de token
        let isValidToken = yield tokenManager.verifyToken(tokenFormatted);
        if (!isValidToken) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        // Extracción del rol del token
        let decodedToken = yield tokenManager.decodeToken(tokenFormatted);
        req.role = decodedToken && decodedToken.role;
        req.user = decodedToken && decodedToken.userId;
        next();
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Error al validar el token de autorización" });
    }
});
exports.authenticateToken = authenticateToken;
