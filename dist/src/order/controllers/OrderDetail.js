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
exports.DetailOrderController = void 0;
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const ProductModel_1 = __importDefault(require("../../products/models/ProductModel"));
const dateManager_1 = require("../../utils/dateManager");
const DetailOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} GET api/pos/order/detail/${req.params.date}`);
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json({
                error: "ID no proporcionado",
            });
        }
        let existingOrder = yield OrderModel_1.default.findById(id);
        if (!existingOrder) {
            return res.status(400).json({
                error: "Orden no encontrada",
            });
        }
        let productArr = [];
        for (let product of existingOrder.pedido.productos) {
            let existingProduct = yield ProductModel_1.default.findById(product.producto).select("name price");
            if (existingProduct) {
                let item = {
                    cantidad: product.cantidad,
                    total: product.total,
                    product: existingProduct,
                };
                productArr.push(item);
            }
            else {
                throw new Error("Producto no existe");
            }
        }
        let orderDetail = {
            guia: existingOrder.envio.guia,
            fechaEntrega: existingOrder.envio.fechaEntrega,
            subtotal: existingOrder.cobros.subtotal,
            envio: existingOrder.costos.envio,
            total: existingOrder.cobros.total,
            product: productArr,
        };
        return res.status(200).json(orderDetail);
    }
    catch (error) {
        return res.status(500).json({
            error: "Error interno en el servidor",
        });
    }
});
exports.DetailOrderController = DetailOrderController;
