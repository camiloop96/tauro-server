import { Router } from "express";
import { OrderList } from "./controllers/OrderList";
import { CreateOrderController } from "./controllers/CreateOrder";
/* import OrderController from "./controllers/order.js"; */

const OrderRoutes = Router();

OrderRoutes.get("/list/by-date/:date/", OrderList);
OrderRoutes.post("/create/", CreateOrderController);
/*Order.post("/delete/", OrderController.delete);
Order.get("/detail/:id/", OrderController.detail);
Order.post("/report/", OrderController.report); */

export default OrderRoutes;
