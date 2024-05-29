import { Router } from "express";
import { OrderList } from "./controllers/OrderList";
import { CreateOrderController } from "./controllers/CreateOrder";
import { DeleteOrderController } from "./controllers/DeleteOrder";
import upload from "../config/multer";
import { DetailOrderController } from "./controllers/OrderDetail";
import { GetOrderInvoiceController } from "./controllers/OrderInvoice";
import authorizeRoles from "../middlewares/authorizeRoles";
import { UpdateCusProperty } from "./controllers/UpdateCusModel";
import { ValidateInvoiceOrder } from "./controllers/ValidateInvoiceOrder";

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
OrderRoutes.post("/invoice/update/validate/:id", ValidateInvoiceOrder);
OrderRoutes.get("/update/model/cus/", UpdateCusProperty);

export default OrderRoutes;
