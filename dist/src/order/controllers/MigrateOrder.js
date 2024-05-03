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
exports.MigrateOrders = void 0;
const CoverageCitiesModel_1 = __importDefault(require("../../shipping/CoverageCities/models/CoverageCitiesModel"));
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const OrderModelMigrate_1 = __importDefault(require("../models/OrderModelMigrate"));
const MigrateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const orders = yield OrderModel_1.default.find();
        for (const order of orders) {
            let departamentoFind = (_b = (_a = order === null || order === void 0 ? void 0 : order.envio) === null || _a === void 0 ? void 0 : _a.datos) === null || _b === void 0 ? void 0 : _b.departamento;
            let ciudadFind = (_d = (_c = order === null || order === void 0 ? void 0 : order.envio) === null || _c === void 0 ? void 0 : _c.datos) === null || _d === void 0 ? void 0 : _d.ciudad;
            console.log("departamento: ", departamentoFind, "ciudad: ", ciudadFind);
            const region = yield CoverageCitiesModel_1.default.findOne({
                ciudad: ciudadFind,
                departamento: departamentoFind,
            });
            if (region) {
                const orderMigrate = new OrderModelMigrate_1.default({
                    envio: {
                        datos: Object.assign({ region: region._id }, order.envio.datos),
                        info: order.envio.info,
                        fechaEntrega: order.envio.fechaEntrega,
                        guia: order.envio.guia,
                    },
                    pedido: order.pedido,
                    pago: order.pago,
                    costos: order.costos,
                    cobros: order.cobros,
                    cliente: order.cliente,
                    created_at: order.created_at,
                    __v: order.__v,
                });
                yield orderMigrate.save();
            }
        }
        return res.status(200).json({ message: "Migración finalizada" });
    }
    catch (error) {
        return res.status(500).json({
            error: "Error interno en el servidor",
        });
    }
});
exports.MigrateOrders = MigrateOrders;
