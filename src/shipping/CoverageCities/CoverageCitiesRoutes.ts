import { Router } from "express";
import { CreateCoverageCityController } from "./controller/CreateController";

const CoverageCitiesRoutes = Router();

CoverageCitiesRoutes.post("/create/", CreateCoverageCityController);

export default CoverageCitiesRoutes;
