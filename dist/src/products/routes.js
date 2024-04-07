"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateController_1 = require("./controller/CreateController");
const ListController_1 = require("./controller/ListController");
const ProductRoutes = (0, express_1.Router)();
ProductRoutes.post("/create/", CreateController_1.CreateProductController);
ProductRoutes.get("/all/", ListController_1.ListProductsController);
exports.default = ProductRoutes;
