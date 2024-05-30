"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Routes Security Gateway
const express_1 = require("express");
const roleRoutes_1 = __importDefault(require("./infrastructure/routes/roleRoutes"));
// User routes instance router
const securityRoutes = (0, express_1.Router)();
// Routes
securityRoutes.use("/roles/", roleRoutes_1.default);
// User export router
exports.default = securityRoutes;
