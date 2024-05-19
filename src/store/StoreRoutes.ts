import { Router } from "express";
import BranchStoreRoutes from "./branch/BranchRoutes";

const StoreRoutes = Router();

StoreRoutes.use("/branch/", BranchStoreRoutes);

export default StoreRoutes;
