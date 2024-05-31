import { Router } from "express";
import securityRoutes from "@modules/security/gateway";
import storeRoutes from "@modules/store/gateway";

// Router initialization
const appRoutes = Router();

// Routes
appRoutes.use("/dashboard/security/", securityRoutes);
appRoutes.use("/dashboard/store/", storeRoutes);

export default appRoutes;
