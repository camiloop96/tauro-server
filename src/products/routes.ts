import { Router } from "express";
import { CreateProductController } from "./controller/CreateController";
import { ListProductsController } from "./controller/ListController";
import { NormalizeController } from "./controller/NormalizeController";

const ProductRoutes = Router();

ProductRoutes.post("/create/", CreateProductController);
ProductRoutes.get("/all/", ListProductsController);
ProductRoutes.post("/verification/normalize/", NormalizeController);

export default ProductRoutes;
