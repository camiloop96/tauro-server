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
exports.GetOrderInvoiceController = void 0;
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const GetOrderInvoiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        let findOrder = yield OrderModel_1.default.findById(id);
        if (!findOrder) {
            return res.status(400).json({
                error: "No se encontraron pedidos asociados",
            });
        }
        if (findOrder.pago.comprobante.url === null) {
            return res.status(400).json({
                error: "No se encontró comprobante",
            });
        }
        return res.status(200).json(findOrder.pago.comprobante.url);
    }
    catch (error) {
        return res.status(500).json({
            error: "Error interno en el servidor",
        });
    }
});
exports.GetOrderInvoiceController = GetOrderInvoiceController;
