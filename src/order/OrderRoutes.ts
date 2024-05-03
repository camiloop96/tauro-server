import { Router } from "express";
import { OrderList } from "./controllers/OrderList";
import { CreateOrderController } from "./controllers/CreateOrder";
import { DeleteOrderController } from "./controllers/DeleteOrder";
import upload from "../../config/multerConfig";
import { DetailOrderController } from "./controllers/OrderDetail";
import { GetOrderInvoiceController } from "./controllers/OrderInvoice";
import authorizeRoles from "../middlewares/authorizeRoles";
/* import OrderController from "./controllers/order.js"; */

const OrderRoutes = Router();

OrderRoutes.get(
  "/list/by-date/:date",
  authorizeRoles(["master", "admin", "seller"]),
  OrderList
);
OrderRoutes.post(
  "/create/",
  authorizeRoles(["master", "admin", "seller"]),
  upload.single("invoiceImage"),
  CreateOrderController
);
OrderRoutes.post("/delete/", DeleteOrderController);
OrderRoutes.get("/detail/:id", DetailOrderController);
OrderRoutes.get("/invoice/get/:id", GetOrderInvoiceController);
// OrderRoutes.get("/migrate/", MigrateOrders);
/*Order.post("/report/", OrderController.report); */

export default OrderRoutes;
