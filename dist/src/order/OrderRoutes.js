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
const OrderDetail_1 = require("./controllers/OrderDetail");
const OrderInvoice_1 = require("./controllers/OrderInvoice");
const authorizeRoles_1 = __importDefault(require("../middlewares/authorizeRoles"));
/* import OrderController from "./controllers/order.js"; */
const OrderRoutes = (0, express_1.Router)();
OrderRoutes.get("/list/by-date/:date", (0, authorizeRoles_1.default)(["master", "admin", "seller"]), OrderList_1.OrderList);
OrderRoutes.post("/create/", (0, authorizeRoles_1.default)(["master", "admin", "seller"]), multerConfig_1.default.single("invoiceImage"), CreateOrder_1.CreateOrderController);
OrderRoutes.post("/delete/", DeleteOrder_1.DeleteOrderController);
OrderRoutes.get("/detail/:id", OrderDetail_1.DetailOrderController);
OrderRoutes.get("/invoice/get/:id", OrderInvoice_1.GetOrderInvoiceController);
// OrderRoutes.get("/migrate/", MigrateOrders);
/*Order.post("/report/", OrderController.report); */
exports.default = OrderRoutes;
