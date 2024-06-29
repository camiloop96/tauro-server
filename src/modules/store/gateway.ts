import { Router } from "express";
import branchStoreRoutes from "./infraestructure/routes/branchStoreRoutes";

// Create router
const storeRoutes = Router();

// Routes
storeRoutes.use("/branch/", branchStoreRoutes);

// Export
export default storeRoutes;
