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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
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
            (orderObj.fechaEntrega = (_a = order === null || order === void 0 ? void 0 : order.envio) === null || _a === void 0 ? void 0 : _a.fechaEntrega),
                (orderObj.guia = (_b = order === null || order === void 0 ? void 0 : order.envio) === null || _b === void 0 ? void 0 : _b.guia);
            orderObj.nombres = customerData === null || customerData === void 0 ? void 0 : customerData.nombres;
            orderObj.celular = customerData === null || customerData === void 0 ? void 0 : customerData.celular;
            orderObj.cedula = customerData === null || customerData === void 0 ? void 0 : customerData.cedula;
            orderObj.departamento = (_c = order === null || order === void 0 ? void 0 : order.envio) === null || _c === void 0 ? void 0 : _c.datos.departamento;
            orderObj.ciudad = (_e = (_d = order === null || order === void 0 ? void 0 : order.envio) === null || _d === void 0 ? void 0 : _d.datos) === null || _e === void 0 ? void 0 : _e.ciudad;
            orderObj.localidad = (_g = (_f = order === null || order === void 0 ? void 0 : order.envio) === null || _f === void 0 ? void 0 : _f.datos) === null || _g === void 0 ? void 0 : _g.localidad;
            orderObj.barrio = (_j = (_h = order === null || order === void 0 ? void 0 : order.envio) === null || _h === void 0 ? void 0 : _h.datos) === null || _j === void 0 ? void 0 : _j.barrio;
            orderObj.direccion = (_l = (_k = order === null || order === void 0 ? void 0 : order.envio) === null || _k === void 0 ? void 0 : _k.datos) === null || _l === void 0 ? void 0 : _l.direccion;
            orderObj.subtotal = (_m = order === null || order === void 0 ? void 0 : order.cobros) === null || _m === void 0 ? void 0 : _m.subtotal;
            orderObj.envio = (_o = order === null || order === void 0 ? void 0 : order.costos) === null || _o === void 0 ? void 0 : _o.envio;
            orderObj.total = (_p = order === null || order === void 0 ? void 0 : order.cobros) === null || _p === void 0 ? void 0 : _p.total;
            orderObj.medioPago = (_q = order === null || order === void 0 ? void 0 : order.pago) === null || _q === void 0 ? void 0 : _q.tipo;
            orderObj.validated = (_s = (_r = order === null || order === void 0 ? void 0 : order.pago) === null || _r === void 0 ? void 0 : _r.comprobante) === null || _s === void 0 ? void 0 : _s.validated;
            orderObj.infoAdic = (_u = (_t = order === null || order === void 0 ? void 0 : order.envio) === null || _t === void 0 ? void 0 : _t.info) === null || _u === void 0 ? void 0 : _u.infoAd;
            orderObj.horario = (_w = (_v = order === null || order === void 0 ? void 0 : order.envio) === null || _v === void 0 ? void 0 : _v.info) === null || _w === void 0 ? void 0 : _w.horario;
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
