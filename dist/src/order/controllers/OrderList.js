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
exports.OrderList = void 0;
const dateManager_1 = require("../../utils/dateManager");
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const CustomerModel_1 = __importDefault(require("../../customer/models/CustomerModel"));
const OrderList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    console.log(`${(0, dateManager_1.getCurrentDate)()} GET api/pos/order/list/by-date/${req.params.date}`);
    let { date } = req.params;
    if (!date) {
        return res.status(400).json({
            error: "Falta campo de fecha",
        });
    }
    try {
        let OrderList = yield OrderModel_1.default.find({
            "envio.fechaEntrega": date,
        });
        let arrEntregas = [];
        for (let order of OrderList) {
            let orderObj = {};
            let customerData = yield CustomerModel_1.default.findOne({ _id: order.cliente });
            orderObj._id = order === null || order === void 0 ? void 0 : order._id;
            orderObj.guia = (_a = order === null || order === void 0 ? void 0 : order.envio) === null || _a === void 0 ? void 0 : _a.guia;
            orderObj.nombres = customerData === null || customerData === void 0 ? void 0 : customerData.nombres;
            orderObj.celular = customerData === null || customerData === void 0 ? void 0 : customerData.celular;
            orderObj.cedula = customerData === null || customerData === void 0 ? void 0 : customerData.cedula;
            orderObj.departamento = (_b = order === null || order === void 0 ? void 0 : order.envio) === null || _b === void 0 ? void 0 : _b.datos.departamento;
            orderObj.ciudad = (_d = (_c = order === null || order === void 0 ? void 0 : order.envio) === null || _c === void 0 ? void 0 : _c.datos) === null || _d === void 0 ? void 0 : _d.ciudad;
            orderObj.localidad = (_f = (_e = order === null || order === void 0 ? void 0 : order.envio) === null || _e === void 0 ? void 0 : _e.datos) === null || _f === void 0 ? void 0 : _f.localidad;
            orderObj.barrio = (_h = (_g = order === null || order === void 0 ? void 0 : order.envio) === null || _g === void 0 ? void 0 : _g.datos) === null || _h === void 0 ? void 0 : _h.barrio;
            orderObj.direccion = (_k = (_j = order === null || order === void 0 ? void 0 : order.envio) === null || _j === void 0 ? void 0 : _j.datos) === null || _k === void 0 ? void 0 : _k.direccion;
            orderObj.subtotal = (_l = order === null || order === void 0 ? void 0 : order.cobros) === null || _l === void 0 ? void 0 : _l.subtotal;
            orderObj.envio = (_m = order === null || order === void 0 ? void 0 : order.cobros) === null || _m === void 0 ? void 0 : _m.subtotal;
            orderObj.total = (_o = order === null || order === void 0 ? void 0 : order.cobros) === null || _o === void 0 ? void 0 : _o.total;
            orderObj.medioPago = (_p = order === null || order === void 0 ? void 0 : order.pago) === null || _p === void 0 ? void 0 : _p.tipo;
            orderObj.comprobante = (_q = order === null || order === void 0 ? void 0 : order.pago) === null || _q === void 0 ? void 0 : _q.tipo;
            arrEntregas.push(orderObj);
        }
        res.status(200).json(arrEntregas);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error interno en el servidor",
        });
    }
});
exports.OrderList = OrderList;
