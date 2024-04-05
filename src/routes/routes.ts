import { Router } from "express";
import SecurityRoutes from "../security/routes/SecurityRoutes";
/* import Order from "./order/routes.js";
import Customer from "./customer/routes.js";
import Product from "./products/routes.js";
import Fulfillment from "./fulfillment/routes.js";
 */
const AppRoutes = Router();

AppRoutes.use("/security/", SecurityRoutes);

/* AppRoutes.use("/order/", Order);
AppRoutes.use("/fulfillment/", Fulfillment);
AppRoutes.use("/customer/", Customer);
AppRoutes.use("/product/", Product); */

export default AppRoutes;
