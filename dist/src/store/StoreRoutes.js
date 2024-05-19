"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BranchRoutes_1 = __importDefault(require("./branch/BranchRoutes"));
const StoreRoutes = (0, express_1.Router)();
StoreRoutes.use("/branch/", BranchRoutes_1.default);
exports.default = StoreRoutes;
