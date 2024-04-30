import { Router } from "express";
import { CreateCoverageCityController } from "./controller/CreateController";
import { ListCoverageCitiesController } from "./controller/ListController";

const CoverageCitiesRoutes = Router();

CoverageCitiesRoutes.post("/create/", CreateCoverageCityController);
CoverageCitiesRoutes.get("/all/", ListCoverageCitiesController);

export default CoverageCitiesRoutes;
