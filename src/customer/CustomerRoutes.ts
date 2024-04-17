import { Router } from "express";
import { CustomerExist } from "./controllers/CustomerIsExist";
import { GetAddressList } from "./controllers/GetAddressList";
import { CustomerCreate } from "./controllers/CustomerCreate";

const CustomerRoutes = Router();

CustomerRoutes.post("/create/", CustomerCreate);
CustomerRoutes.post("/verification/exist/", CustomerExist);
CustomerRoutes.get("/verification/delivery/data/list/:id/", GetAddressList);

export default CustomerRoutes;
