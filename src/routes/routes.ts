import { Router } from "express";
import SecurityRoutes from "../security/routes/SecurityRoutes";
import ProductRoutes from "../products/routes";
import { authenticateToken } from "../middlewares/authenticateToken";
/* import Order from "./order/routes.js";
import Customer from "./customer/routes.js";
import Product from "./products/routes.js";
import Fulfillment from "./fulfillment/routes.js";
 */
const AppRoutes = Router();

// Rutas
AppRoutes.use("/security/", SecurityRoutes);
AppRoutes.use("/product/", authenticateToken, ProductRoutes);
/* AppRoutes.use("/order/", authenticateToken, OrderRoutes); */
/*
AppRoutes.use("/fulfillment/", Fulfillment);
AppRoutes.use("/customer/", Customer);
*/
export default AppRoutes;
