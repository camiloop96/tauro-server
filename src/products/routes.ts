import { Router } from "express";
import { CreateProductController } from "./controller/CreateController";
import { ListProductsController } from "./controller/ListController";

const ProductRoutes = Router();

ProductRoutes.post("/create/", CreateProductController);
ProductRoutes.get("/all/", ListProductsController);

export default ProductRoutes;
