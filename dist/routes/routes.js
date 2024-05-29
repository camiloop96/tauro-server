"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SecurityRoutes_1 = __importDefault(require("../security/routes/SecurityRoutes"));
// Router initialization
const App_Routes = (0, express_1.Router)();
// Routes
App_Routes.use("/dashboard/security/", SecurityRoutes_1.default);
// App_Routes.use("/product/", authenticateToken, ProductRoutes);
// App_Routes.use("/pos/order/", authenticateToken, OrderRoutes);
// App_Routes.use("/customer/", authenticateToken, CustomerRoutes);
// App_Routes.use("/shipping/", authenticateToken, ShippingRoutes);
// App_Routes.use("/store/", authenticateToken, StoreRoutes);
// App_Routes.use("/staff/", authenticateToken, StaffRoutes);
exports.default = App_Routes;
