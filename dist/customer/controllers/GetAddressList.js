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
exports.GetAddressList = void 0;
const dateManager_1 = require("../../utils/dateManager");
const CustomerModel_1 = __importDefault(require("../models/CustomerModel"));
const AdressItem_1 = __importDefault(require("../models/AdressItem"));
const GetAddressList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} POST simora/api/customer/verification/delivery/data/list/`);
    let { id } = req.params || {};
    if (!id) {
        return res.status(400).json({
            error: "Id es requerido",
        });
    }
    try {
        let customerExist = yield CustomerModel_1.default.findOne({ _id: id });
        if (!customerExist) {
            return res.status(404).json({
                error: "Cliente no existe",
            });
        }
        let addressList = [];
        if (customerExist.addressList && customerExist.addressList.length > 0) {
            addressList = yield Promise.all(customerExist.addressList.map((address) => __awaiter(void 0, void 0, void 0, function* () {
                const addressItem = yield AdressItem_1.default.findOne({ _id: address._id });
                return addressItem;
            })));
        }
        else {
            return res.status(500).json({
                error: "Error 600",
            });
        }
        return res.status(200).json(addressList);
    }
    catch (error) {
        console.error("Error al consultar cliente:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});
exports.GetAddressList = GetAddressList;
