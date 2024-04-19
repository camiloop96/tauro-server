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
exports.DeleteOrderController = void 0;
const dateManager_1 = require("../../utils/dateManager");
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const guide_1 = __importDefault(require("../guide/models/guide"));
const DeleteOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} POST api/order/delete/`);
    let data = req.body;
    try {
        if (!data) {
            return res.status(400).json({
                error: "Selecciona al menos un pedido para eliminar",
            });
        }
        for (const orderItem of data) {
            // Encuentra el order por su _id
            console.log(orderItem);
            const order = yield OrderModel_1.default.findById(orderItem);
            console.log(order);
            if (!order) {
                console.log(`order con _id ${orderItem} no encontrado.`);
                continue;
            }
            // Elimina rl numero de guia
            let orderGuide = order.envio.guia;
            yield guide_1.default.findOneAndDelete({ number: orderGuide });
            // Elimina el order principal
            yield OrderModel_1.default.findByIdAndDelete(orderItem);
            console.log(`Orden con _id ${orderItem} eliminado correctamente.`);
        }
        res.status(200).json({ msg: "Pedidos eliminados correctamente" });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
});
exports.DeleteOrderController = DeleteOrderController;
