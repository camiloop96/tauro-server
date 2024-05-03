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
exports.DeleteRole = void 0;
const RolesModel_1 = __importDefault(require("../models/RolesModel"));
const DeleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Verificación de existencia del id en el request
        if (!id) {
            return res.status(400).json({
                error: "Falta el id de rol",
            });
        }
        // Eliminación del documento
        const deletedRole = yield RolesModel_1.default.findByIdAndDelete(id);
        // Verificación de existencia del rol en la db
        if (!deletedRole) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        // Respuesta
        res.status(200).json({ message: "Rol eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar el rol:", error);
        res
            .status(500)
            .json({ message: "Error interno del servidor al eliminar el rol" });
    }
});
exports.DeleteRole = DeleteRole;
