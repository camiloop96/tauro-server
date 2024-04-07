"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SecurityRoutes_1 = __importDefault(require("../security/routes/SecurityRoutes"));
const routes_1 = __importDefault(require("../products/routes"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
/* import Order from "./order/routes.js";
import Customer from "./customer/routes.js";
import Product from "./products/routes.js";
import Fulfillment from "./fulfillment/routes.js";
 */
const AppRoutes = (0, express_1.Router)();
// Rutas
AppRoutes.use("/security/", SecurityRoutes_1.default);
AppRoutes.use("/product/", authenticateToken_1.authenticateToken, routes_1.default);
/* AppRoutes.use("/order/", authenticateToken, OrderRoutes); */
/*
AppRoutes.use("/fulfillment/", Fulfillment);
AppRoutes.use("/customer/", Customer);
*/
exports.default = AppRoutes;
