"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomerIsExist_1 = require("./controllers/CustomerIsExist");
const GetAddressList_1 = require("./controllers/GetAddressList");
const CustomerCreate_1 = require("./controllers/CustomerCreate");
const CustomerRoutes = (0, express_1.Router)();
CustomerRoutes.post("/create/", CustomerCreate_1.CustomerCreate);
CustomerRoutes.post("/verification/exist/", CustomerIsExist_1.CustomerExist);
CustomerRoutes.get("/verification/delivery/data/list/:id/", GetAddressList_1.GetAddressList);
exports.default = CustomerRoutes;