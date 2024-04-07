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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderController = void 0;
const dateManager_1 = require("../../utils/dateManager");
const CreateOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${(0, dateManager_1.getCurrentDate)()} POST simora/api/order/create/`);
    try {
        // Request
        let orderRequest = req.body || {};
        // Verifica que todos los campos obligatorios estén presentes
        const requiredFields = [
            "barrio",
            "horario",
            "productos",
            "envio",
            "fechaEntrega",
            "infoAdic",
            "pago",
            "origen",
            "estado",
            "idCliente",
            "ciudad",
            "departamento",
            "direccion",
            "localidad",
        ];
        const missingFields = requiredFields.filter((field) => !orderRequest[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Los campos ${missingFields.join(", ")} son obligatorios.`,
            });
        }
        // Genera el cálculo de los productos 
        let generateItem = (products) => __awaiter(void 0, void 0, void 0, function* () {
            const productList = [];
            for (let i = 0; i < products.length; i++) {
                const element = products[i];
                let product = yield Product.findOne({ _id: element.product });
                let productItem = {
                    product: product._id,
                    cant: element.cant,
                    subtotal: product.price * element.cant,
                    total: product.price * element.cant,
                };
                let newProductItem = new ProductItem(productItem);
                newProductItem.save();
                productList.push(newProductItem);
            }
            return {
                productList,
            };
        });
        let productItems = yield generateItem(productos);
        productItems = productItems.productList;
        let { subtotal, total } = yield calculateTaxes(productItems, envio);
        let guideNumber = yield generateUniqueGuideNumber();
        //Creacion del order
        const nuevoPedido = new Order({
            guia: guideNumber,
            barrio,
            horario,
            productItems,
            envio,
            total,
            fechaEntrega,
            infoAdic,
            pago,
            origen,
            estado,
            idCliente: new ObjectId(idCliente),
            subtotal,
            ciudad,
            departamento,
            direccion,
            localidad,
        });
        yield nuevoPedido.save();
        res.status(201).json({ mensaje: "order creado con éxito" });
    }
    catch (error) {
        console.error("Error al crear el order:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});
exports.CreateOrderController = CreateOrderController;
