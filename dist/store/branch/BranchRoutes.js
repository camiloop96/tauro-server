"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateBranch_1 = require("./controllers/CreateBranch");
const BranchStoreRoutes = (0, express_1.Router)();
BranchStoreRoutes.post("/create/", CreateBranch_1.CreateBranch);
exports.default = BranchStoreRoutes;
