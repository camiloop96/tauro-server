import { Router } from "express";
import { OrderList } from "./controllers/OrderList";
import { CreateOrderController } from "./controllers/CreateOrder";
import { DeleteOrderController } from "./controllers/DeleteOrder";
import upload from "../../config/multerConfig";
/* import OrderController from "./controllers/order.js"; */

const OrderRoutes = Router();

OrderRoutes.get("/list/by-date/:date", OrderList);
OrderRoutes.post("/create/", upload.single('comprobante'),  CreateOrderController);
OrderRoutes.post("/delete/", DeleteOrderController);
/*Order.get("/detail/:id/", OrderController.detail);
Order.post("/report/", OrderController.report); */

export default OrderRoutes;
