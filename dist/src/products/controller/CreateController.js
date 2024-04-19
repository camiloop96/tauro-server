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
exports.CreateProductController = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const dateManager_1 = require("../../utils/dateManager");
const CreateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} GET simora/api/product/create/`);
    try {
        // Extrae los datos del producto de la solicitud (request)
        const { nombre, precio } = req.body;
        // Comprobaciones de existencia
        if (!nombre) {
            return res.status(400).json({
                message: "Falta el campo nombre",
            });
        }
        if (!precio) {
            return res.status(400).json({
                message: "Falta el campo precio",
            });
        }
        else if (isNaN(precio)) {
            return res.status(400).json({
                message: "El campo precio debe ser número",
            });
        }
        // Comprobaciones de duplicidad
        const existingProduct = yield ProductModel_1.default.findOne({ nombre });
        if (existingProduct) {
            return res.status(404).json({
                message: "El producto ya existe",
            });
        }
        // Crea una instancia del modelo de productos con los datos
        const newProduct = new ProductModel_1.default({
            createdAt: new Date(0),
            nombre,
            precio,
        });
        // Guarda el producto en la base de datos
        yield newProduct.save();
        // Respuesta exitosa
        res.status(201).json({ message: "Producto guardado con éxito" });
    }
    catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.CreateProductController = CreateProductController;
