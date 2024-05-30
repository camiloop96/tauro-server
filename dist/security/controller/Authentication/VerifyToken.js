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
exports.VerifyTokenController = void 0;
const tokenManager_1 = require("../../../modules/security/shared/tokenManager");
const dateManager_1 = require("../../../utils/dateManager");
const VerifyTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} ${req.method} simora/api/authentication/security/token/verify/`);
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: "Token no proporcionado" });
        }
        let isValid = yield (0, tokenManager_1.verifyToken)(token);
        if (isValid) {
            return res.status(200).json({
                valid: true,
            });
        }
        else {
            return res.status(403).json({
                valid: false,
            });
        }
    }
    catch (error) {
        console.error("Error al verificar el token:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.VerifyTokenController = VerifyTokenController;
