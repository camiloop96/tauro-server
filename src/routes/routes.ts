import { Router } from "express";
import SecurityRoutes from "../security/routes/SecurityRoutes";
import ProductRoutes from "../products/routes";
import { authenticateToken } from "../middlewares/authenticateToken";
import OrderRoutes from "../order/OrderRoutes";
import CustomerRoutes from "../customer/CustomerRoutes";
import ShippingRoutes from "../shipping/ShippingRoutes";

// Creacion del enrutador
const AppRoutes = Router();

// Rutas
AppRoutes.use("/security/", SecurityRoutes);
AppRoutes.use("/product/", authenticateToken, ProductRoutes);
/* AppRoutes.use("/pos/order/", authenticateToken, OrderRoutes); */
AppRoutes.use("/pos/order/", OrderRoutes);
AppRoutes.use("/customer/", authenticateToken, CustomerRoutes);
AppRoutes.use("/shipping/", ShippingRoutes);

export default AppRoutes;
