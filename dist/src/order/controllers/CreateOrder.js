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
exports.CreateOrderController = void 0;
const CustomerModel_1 = __importDefault(require("../../customer/models/CustomerModel"));
const AdressItem_1 = __importDefault(require("../../customer/models/AdressItem"));
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const ProductModel_1 = __importDefault(require("../../products/models/ProductModel"));
const guide_1 = require("../guide/controller/guide");
const saveImageToCloudinary_1 = require("../../utils/saveImageToCloudinary");
const OrderBySeller_1 = __importDefault(require("../models/OrderBySeller"));
const CreateOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Desestructuracion de orden
        let { orderData } = req.body;
        let orderDecoded = JSON.parse(orderData);
        let { factura, vendedor } = orderDecoded;
        let { cliente, pedido, envio, pago, costos } = factura || {};
        // Comprobacion de nulidad
        if (!factura) {
            return res.status(400).json({
                error: "El formato de factura tiene error o no existe",
            });
        }
        // Desestructuración de cliente
        let { nombres } = cliente || {};
        // Comprobacion de nulidad de cliente
        // Validacion del cliente
        if (!cliente && !nombres && !cliente.celular && !cliente.cedula) {
            return res.status(400).json({
                error: "Faltan datos del cliente o están incompletos",
            });
        }
        if (!envio.datos.direccion &&
            !envio.datos.barrio &&
            !envio.datos.ciudad &&
            !envio.datos.departamento) {
            return res.status(400).json({
                error: "La dirección de envío es incompleta",
            });
        }
        // Comprobacion de existencia de cliente
        let existingCustomer = yield CustomerModel_1.default.findOne({
            celular: cliente.celular,
        });
        // Desestructuracion de datos de envio
        let { datos } = envio || {};
        let datosEnvio = datos;
        let direccion = datosEnvio.direccion;
        let createOrder = new OrderModel_1.default();
        let newCustomer;
        if (existingCustomer) {
            createOrder.cliente = existingCustomer._id;
            let arr = [];
            let addressList = existingCustomer.addressList;
            for (let addressId of addressList) {
                let item = yield AdressItem_1.default.findById(addressId);
                if (item) {
                    arr.push(item);
                }
            }
            // Buscar cliente en la dirección en la lista de direcciones del cliente
            let existingAddress = arr.find((item) => item.direccion === direccion);
            if (existingAddress) {
                createOrder.envio.datos = existingAddress;
            }
            else {
                let envioData = {
                    departamento: datosEnvio.departamento,
                    ciudad: datosEnvio.ciudad,
                    localidad: datosEnvio.localidad,
                    barrio: datosEnvio.barrio,
                    direccion: datosEnvio.direccion,
                };
                let newAddressItem = new AdressItem_1.default(envioData);
                yield newAddressItem.save();
                existingCustomer.addressList.push(newAddressItem);
                yield existingCustomer.save();
                createOrder.envio.datos = newAddressItem;
            }
        }
        else {
            let envioData = {
                departamento: datosEnvio.departamento,
                ciudad: datosEnvio.ciudad,
                localidad: datosEnvio.localidad,
                barrio: datosEnvio.barrio,
                direccion: datosEnvio.direccion,
            };
            let newAddressItem = yield AdressItem_1.default.create(envioData);
            let newCustomerData = {
                nombres: cliente.nombres,
                cedula: cliente.cedula,
                celular: cliente.celular,
                addressList: [newAddressItem],
                created_at: new Date(Date.now()),
            };
            newCustomer = yield CustomerModel_1.default.create(newCustomerData);
            createOrder.cliente = newCustomer._id;
            createOrder.envio.datos = newAddressItem;
        }
        if (envio.datos) {
            createOrder.envio.info = envio.info;
            createOrder.envio.fechaEntrega = envio.fechaEntrega;
        }
        // Costos
        createOrder.costos = costos;
        // Pago
        createOrder.pago.tipo = pago.tipo;
        // Comprobante
        let imageFile = req.file;
        if (imageFile && pago.tipo === "Anticipado") {
            let idInvoice = createOrder._id.toString();
            let exportInvoice = yield (0, saveImageToCloudinary_1.saveImageToCloudinary)(imageFile, "pos/order/invoice/", idInvoice);
            createOrder.pago.comprobante.url = exportInvoice.url;
            createOrder.pago.comprobante.asset_id = exportInvoice.asset_id;
            createOrder.pago.comprobante.validated = false;
        }
        else {
            createOrder.pago.comprobante.url = null;
            createOrder.pago.comprobante.asset_id = null;
            createOrder.pago.comprobante.validated = null;
        }
        // Timestamp
        createOrder.created_at = new Date(Date.now());
        // Productos
        let productos = pedido.productos;
        let arr = [];
        for (let itemProducto of productos) {
            let idProducto = itemProducto.product._id;
            let productExist = yield ProductModel_1.default.findById(idProducto);
            if (productExist) {
                let subtotal = productExist.price * itemProducto.cantidad;
                let productoItem = {
                    producto: productExist._id,
                    cantidad: itemProducto.cantidad,
                    total: subtotal,
                    created_at: new Date(Date.now()),
                };
                arr.push(productoItem);
            }
        }
        // Ingresar productos al envio
        createOrder.pedido.productos = arr;
        let orderGuide = yield (0, guide_1.generateUniqueGuideNumber)();
        createOrder.envio.guia = orderGuide;
        // Cobros
        let getTotalPriceOrder = (productos, envio) => {
            let total = 0;
            let subtotal = 0;
            let cantProductos = 0;
            // Suma de los totales de los productos
            const totalProductos = productos.reduce((acc, producto) => {
                if (producto.total !== undefined) {
                    return acc + producto.total;
                }
                return acc;
            }, 0);
            // Suma de los totales de los productos
            const cantidadProductos = productos.reduce((acc, producto) => {
                if (producto.total !== undefined) {
                    return acc + producto.cantidad;
                }
                return acc;
            }, 0);
            let iva = totalProductos * 0.19;
            total = totalProductos + envio;
            subtotal = totalProductos;
            cantProductos = cantidadProductos;
            return { subtotal, iva, total, cantProductos };
        };
        let { subtotal, iva, total, cantProductos } = getTotalPriceOrder((_a = createOrder === null || createOrder === void 0 ? void 0 : createOrder.pedido) === null || _a === void 0 ? void 0 : _a.productos, ((_b = createOrder === null || createOrder === void 0 ? void 0 : createOrder.costos) === null || _b === void 0 ? void 0 : _b.envio) || 0);
        createOrder.cobros.cantProductos = cantProductos;
        createOrder.cobros.subtotal = subtotal;
        createOrder.cobros.IVA = iva;
        createOrder.cobros.total = total;
        // Guardado del pedido al vendedor
        let saveOrderAtSeller = new OrderBySeller_1.default({
            userId: vendedor,
            orderId: createOrder._id,
        });
        yield saveOrderAtSeller.save();
        yield createOrder.save();
        res.status(200).json({
            message: "Pedido agendado con éxito",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error interno en el servidor",
        });
    }
});
exports.CreateOrderController = CreateOrderController;
