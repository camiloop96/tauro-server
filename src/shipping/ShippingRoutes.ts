import { Router } from "express";
import { GenerateGuideController } from "./controller/ShippingGuide/GenerateGuideController";
import upload from "../../config/multerConfig";
import CoverageCitiesRoutes from "./CoverageCities/CoverageCitiesRoutes";

const ShippingRoutes = Router();

ShippingRoutes.post(
  "/guides/xlsx/generate",
  upload.single("file"),
  GenerateGuideController
);

ShippingRoutes.use('/coverage/cities/', CoverageCitiesRoutes)
export default ShippingRoutes;
