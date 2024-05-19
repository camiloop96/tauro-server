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
exports.updateFullNameToEmployee = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
function updateFullNameToEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield UserModel_1.default.updateMany({ fullName: { $exists: true } }, { $rename: { fullName: "employee" } });
            return res.status(200).json({ message: "Actualizado" });
        }
        catch (error) {
            console.error("Error al actualizar documentos:", error);
        }
    });
}
exports.updateFullNameToEmployee = updateFullNameToEmployee;
