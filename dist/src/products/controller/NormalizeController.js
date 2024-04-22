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
exports.NormalizeController = void 0;
const dateManager_1 = require("../../utils/dateManager");
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const NormalizeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} GET simora/api/product/normalize/`);
    const { products } = req.body;
    // Lista para almacenar los nombres de los productos que no se encontraron
    const notFoundProducts = [];
    try {
        // Lista para almacenar los productos encontrados
        const foundProducts = [];
        // Iterar sobre los productos recibidos
        for (const product of products) {
            // Buscar el producto en la colección de MongoDB
            const foundProduct = yield ProductModel_1.default.findOne({ name: product.nombre });
            // Si el producto no se encuentra, agregar su nombre a la lista de errores
            if (!foundProduct) {
                notFoundProducts.push(product.nombre);
            }
            else {
                // Si se encuentra, agregarlo a la lista de productos encontrados
                foundProducts.push({
                    cantidad: product.cantidad,
                    product: {
                        _id: foundProduct._id,
                        name: foundProduct.name,
                        price: foundProduct.price,
                    },
                });
            }
        }
        // Si hay productos que no se encontraron, devolver un mensaje de error
        if (notFoundProducts.length > 0) {
            return res.status(400).json({
                error: `Los siguientes productos no fueron encontrados: ${notFoundProducts.join(", ")}`,
            });
        }
        // Si todos los productos se encontraron, devolver la lista de productos
        return res.status(200).json(foundProducts);
    }
    catch (error) {
        return res.status(500).json({
            error: "Error interno en el servidor",
        });
    }
});
exports.NormalizeController = NormalizeController;
