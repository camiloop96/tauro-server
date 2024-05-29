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
exports.ValidateInvoiceOrder = void 0;
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const ValidateInvoiceOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params || {};
        let { cus } = req.body || {};
        if (!cus) {
            return res.status(400).json({
                error: "Debe ingresar un cus válido",
            });
        }
        if (!id) {
            return res.status(400).json({
                error: "Falta id en parametros",
            });
        }
        let existingOrder = yield OrderModel_1.default.findById(id);
        if (!existingOrder) {
            return res.status(400).json({
                error: "Pedido no existe",
            });
        }
        // Actualiza estado validación
        existingOrder.pago.comprobante.validated = true;
        existingOrder.pago.comprobante.cus = cus;
        existingOrder.save();
        return res.status(200).json({
            message: "Pago validado",
        });
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.ValidateInvoiceOrder = ValidateInvoiceOrder;
