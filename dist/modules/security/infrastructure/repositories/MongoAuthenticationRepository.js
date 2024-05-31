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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoAuthenticationRepository = void 0;
const AppError_1 = require("../../../../shared/errors/AppError");
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
// Variables de entorno
(_a = (0, dotenv_1.config)()) === null || _a === void 0 ? void 0 : _a.parsed;
let JWT_SECRET = process.env.JWT_SECRET;
class MongoAuthenticationRepository {
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar si el JWT_SECRET está definido
                if (!JWT_SECRET) {
                    throw new Error("JWT_SECRET is not defined in env");
                }
                return new Promise((resolve, reject) => {
                    (0, jsonwebtoken_1.verify)(token, JWT_SECRET, (error, decodedToken) => {
                        if (error) {
                            resolve(false);
                        }
                        else {
                            resolve(true);
                        }
                    });
                });
            }
            catch (error) { }
        });
    }
    decodeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Missing token");
                }
                // Decodificar el token
                const tokenDecoded = (0, jsonwebtoken_1.decode)(token);
                if (!tokenDecoded) {
                    throw new Error("Authorization token invalid");
                }
                return tokenDecoded;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if JWT_SECRET is on env
                if (!JWT_SECRET) {
                    throw new AppError_1.AppError("JWT_SECRET is not defined in env", 404);
                }
                // Create token
                const token = (0, jsonwebtoken_1.sign)(payload, JWT_SECRET);
                return token;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error creating token", 500);
                }
            }
        });
    }
}
exports.MongoAuthenticationRepository = MongoAuthenticationRepository;
