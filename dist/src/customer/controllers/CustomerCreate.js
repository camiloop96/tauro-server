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
exports.CustomerCreate = void 0;
const dateManager_1 = require("../../utils/dateManager");
const CustomerModel_1 = __importDefault(require("../models/CustomerModel"));
const AdressItem_1 = __importDefault(require("../models/AdressItem"));
const CustomerCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} POST simora/api/customer/create`);
    try {
        const { nombres, cedula, celular, datosEnvio } = req.body;
        console.log(nombres, celular, cedula, datosEnvio);
        // Verificar que se proporcionaron los campos obligatorios
        if (!nombres) {
            return res.status(400).json({ mensaje: "Faltan campo nombres" });
        }
        // Verificar que se proporcionaron los campos obligatorios
        if (!cedula) {
            return res.status(400).json({ mensaje: "Faltan campo cédula" });
        } // Verificar que se proporcionaron los campos obligatorios
        if (!celular) {
            return res.status(400).json({ mensaje: "Faltan campo celular" });
        } // Verificar que se proporcionaron los campos obligatorios
        if (!datosEnvio) {
            return res.status(400).json({ mensaje: "Faltan campo datosEnvio" });
        }
        // Verificar que el celular sea un número de 10 dígitos
        if (typeof celular !== "number" || celular.toString().length !== 10) {
            return res.status(400).json({
                mensaje: "El número de celular debe ser un número de 10 dígitos",
            });
        }
        // Address Exist
        let customerExist = yield CustomerModel_1.default.findOne({ celular: celular });
        if (customerExist) {
            res.status(2000).json({ message: "Cliente existe" });
        }
        else {
            let createAddress = new AdressItem_1.default(datosEnvio);
            createAddress.save();
            console.log(createAddress);
            if (createAddress) {
                let createCustomer = new CustomerModel_1.default({
                    nombres: nombres,
                    cedula: cedula,
                    celular: celular,
                    addressList: [createAddress._id],
                });
                createCustomer.save();
                res.status(201).json({
                    ok: true,
                    msg: "Cliente creado con éxito",
                    data: createCustomer._id,
                });
            }
        }
    }
    catch (error) {
        console.error("Error al crear el pedido:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});
exports.CustomerCreate = CustomerCreate;
