import { Router } from "express";
import SecurityRoutes from "../security/routes/SecurityRoutes";
import ProductRoutes from "../products/routes";
import { authenticateToken } from "../middlewares/authenticateToken";
import OrderRoutes from "../order/OrderRoutes";
import CustomerRoutes from "../customer/CustomerRoutes";
import ShippingRoutes from "../shipping/ShippingRoutes";
import StoreRoutes from "../store/StoreRoutes";
import StaffRoutes from "../staff/StaffRoutesRoutes";
import userRoutes from "@modules/security/infrastructure/routes/userRoutes";

// Router initialization
const App_Routes = Router();

// Routes
App_Routes.use("/dashboard/security/", SecurityRoutes);
// App_Routes.use("/product/", authenticateToken, ProductRoutes);
// App_Routes.use("/pos/order/", authenticateToken, OrderRoutes);
// App_Routes.use("/customer/", authenticateToken, CustomerRoutes);
// App_Routes.use("/shipping/", authenticateToken, ShippingRoutes);
// App_Routes.use("/store/", authenticateToken, StoreRoutes);
// App_Routes.use("/staff/", authenticateToken, StaffRoutes);

export default App_Routes;
