import { Router } from "express";
import { CreateBranch } from "./controllers/CreateBranch";

const BranchStoreRoutes = Router();

BranchStoreRoutes.post("/create/", CreateBranch);

export default BranchStoreRoutes;
