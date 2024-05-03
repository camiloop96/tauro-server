"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SecurityRoutes_1 = __importDefault(require("../security/routes/SecurityRoutes"));
const routes_1 = __importDefault(require("../products/routes"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const OrderRoutes_1 = __importDefault(require("../order/OrderRoutes"));
const CustomerRoutes_1 = __importDefault(require("../customer/CustomerRoutes"));
const ShippingRoutes_1 = __importDefault(require("../shipping/ShippingRoutes"));
// Creacion del enrutador
const AppRoutes = (0, express_1.Router)();
// Rutas
AppRoutes.use("/security/", SecurityRoutes_1.default);
AppRoutes.use("/product/", authenticateToken_1.authenticateToken, routes_1.default);
AppRoutes.use("/pos/order/", authenticateToken_1.authenticateToken, OrderRoutes_1.default);
AppRoutes.use("/customer/", authenticateToken_1.authenticateToken, CustomerRoutes_1.default);
AppRoutes.use("/shipping/", ShippingRoutes_1.default);
exports.default = AppRoutes;
