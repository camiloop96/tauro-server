import { Router } from "express";
import { GenerateGuideController } from "./controller/ShippingGuide/GenerateGuideController";
import upload from "../../config/multerConfig";

const ShippingRoutes = Router();

ShippingRoutes.post(
  "/guides/xlsx/generate",
  upload.single("file"),
  GenerateGuideController
);
export default ShippingRoutes;
