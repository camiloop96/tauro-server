"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateController_1 = require("./controller/CreateController");
const ListController_1 = require("./controller/ListController");
const CoverageCitiesRoutes = (0, express_1.Router)();
CoverageCitiesRoutes.post("/create/", CreateController_1.CreateCoverageCityController);
CoverageCitiesRoutes.get("/all/", ListController_1.ListCoverageCitiesController);
exports.default = CoverageCitiesRoutes;
