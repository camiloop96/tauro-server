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
exports.CustomerExist = void 0;
const CustomerModel_1 = __importDefault(require("../models/CustomerModel"));
const dateManager_1 = require("../../utils/dateManager");
const CustomerExist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} POST simora/api/customer/verification/exist`);
    let { celular } = req.body || {};
    try {
        let clientExist = yield CustomerModel_1.default.findOne({ celular: celular });
        if (clientExist) {
            res.status(200).json(clientExist);
        }
        else {
            res.status(400).json({
                error: "El cliente no existe",
            });
        }
    }
    catch (error) {
        console.error("Error al consultar cliente:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});
exports.CustomerExist = CustomerExist;
