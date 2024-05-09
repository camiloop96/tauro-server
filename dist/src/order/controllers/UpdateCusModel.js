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
exports.UpdateCusProperty = void 0;
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const UpdateCusProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Actualiza todos los documentos en la colección "orders"
        yield OrderModel_1.default.updateMany({}, { $set: { "pago.comprobante.cus": null } });
        res.json({ message: "Actualización exitosa" });
    }
    catch (error) {
        console.error("Error al actualizar documentos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.UpdateCusProperty = UpdateCusProperty;
