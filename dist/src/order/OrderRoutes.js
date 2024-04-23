"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderList_1 = require("./controllers/OrderList");
const CreateOrder_1 = require("./controllers/CreateOrder");
const DeleteOrder_1 = require("./controllers/DeleteOrder");
const multerConfig_1 = __importDefault(require("../../config/multerConfig"));
/* import OrderController from "./controllers/order.js"; */
const OrderRoutes = (0, express_1.Router)();
OrderRoutes.get("/list/by-date/:date", OrderList_1.OrderList);
OrderRoutes.post("/create/", multerConfig_1.default.single('comprobante'), CreateOrder_1.CreateOrderController);
OrderRoutes.post("/delete/", DeleteOrder_1.DeleteOrderController);
/*Order.get("/detail/:id/", OrderController.detail);
Order.post("/report/", OrderController.report); */
exports.default = OrderRoutes;
