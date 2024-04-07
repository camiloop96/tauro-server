"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    guia: { type: String, required: true },
    ciudad: { type: String, required: true },
    departamento: { type: String, default: "Cundinamarca" },
    direccion: { type: String, required: true },
    localidad: { type: String, required: true },
    barrio: { type: String, required: true },
    horario: { type: String, required: true },
    created_at: { type: String, required: true },
    productItems: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "ProductItem" }],
    envio: { type: Number, required: true },
    total: { type: mongoose_1.Types.Decimal128, required: true },
    fechaEntrega: { type: String, required: true },
    infoAdic: { type: String, required: true },
    pago: { type: String, default: "Contraentrega" },
    origen: { type: String, required: true },
    estado: { type: String, required: true },
    idCliente: { type: mongoose_1.Schema.Types.ObjectId, ref: "Customer", required: true },
    subtotal: { type: mongoose_1.Types.Decimal128, required: true },
}, { timestamps: true });
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
