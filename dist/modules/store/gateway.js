"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const branchStoreRoutes_1 = __importDefault(require("./infraestructure/routes/branchStoreRoutes"));
// Create router
const storeRoutes = (0, express_1.Router)();
// Routes
storeRoutes.use("/branch/", branchStoreRoutes_1.default);
// Export
exports.default = storeRoutes;
