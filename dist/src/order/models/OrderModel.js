"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_2 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    IdFacturacion: {
        type: String,
    },
    cliente: {
        type: mongoose_2.Types.ObjectId,
        ref: "Customer",
    },
    envio: {
        guia: String,
        fechaEntrega: {
            type: String,
            required: true,
        },
        datos: {
            _id: mongoose_2.Types.ObjectId,
            departamento: {
                type: String,
            },
            ciudad: {
                type: String,
            },
            localidad: {
                type: String,
            },
            barrio: {
                type: String,
            },
            direccion: {
                type: String,
            },
        },
        info: {
            horario: {
                type: String,
            },
            infoAd: {
                type: String,
                default: null,
            },
        },
    },
    pedido: {
        productos: [
            {
                producto: {
                    type: mongoose_2.Types.ObjectId,
                    ref: "Producto",
                },
                cantidad: {
                    type: Number,
                },
                base: {
                    type: Number,
                },
                iva: {
                    type: Number,
                },
                total: {
                    type: Number,
                },
                created_at: {
                    type: Date,
                },
            },
        ],
    },
    pago: {
        tipo: {
            type: String,
            required: true,
        },
        comprobante: {
            type: String,
        },
    },
    costos: {
        envio: {
            type: Number,
            required: true,
        },
    },
    cobros: {
        cantProductos: { type: Number },
        subtotal: { type: Number },
        IVA: { type: Number },
        total: { type: Number },
    },
    created_at: {
        type: Date,
    },
});
const OrderModel = mongoose_1.default.model("Order", orderSchema);
exports.default = OrderModel;
