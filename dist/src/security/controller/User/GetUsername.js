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
exports.GetUsername = void 0;
const tokenManager_1 = require("../../utils/tokenManager");
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const GetUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { token } = req.body;
    try {
        let decodedToken = yield (0, tokenManager_1.decodeToken)(token);
        let username = yield UserModel_1.default.findOne(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id);
        if (!username) {
            return res.status(500).json({
                error: "Error interno en el servidor",
            });
        }
        return res.status(200).json({
            username: username === null || username === void 0 ? void 0 : username.fullName,
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Error interno en el servidor",
        });
    }
});
exports.GetUsername = GetUsername;
