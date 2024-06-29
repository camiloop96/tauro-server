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
exports.ListProductsController = void 0;
const dateManager_1 = require("../../utils/dateManager");
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const ListProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} GET simora/api/product/all/`);
    try {
        // Consulta todos los productos en la base de datos
        const products = yield ProductModel_1.default.find();
        // Envía la lista de productos como respuesta
        res.status(200).json(products);
    }
    catch (error) {
        // Manejo de errores
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.ListProductsController = ListProductsController;
