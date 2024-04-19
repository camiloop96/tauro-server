"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GenerateGuideController_1 = require("./controller/ShippingGuide/GenerateGuideController");
const multerConfig_1 = __importDefault(require("../../config/multerConfig"));
const ShippingRoutes = (0, express_1.Router)();
ShippingRoutes.post("/guides/xlsx/generate", multerConfig_1.default.single("file"), GenerateGuideController_1.GenerateGuideController);
exports.default = ShippingRoutes;
