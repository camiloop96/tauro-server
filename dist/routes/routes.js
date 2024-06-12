"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gateway_1 = __importDefault(require("../modules/security/gateway"));
const gateway_2 = __importDefault(require("../modules/store/gateway"));
const gateway_3 = __importDefault(require("../modules/staff/gateway"));
// Router initialization
const appRoutes = (0, express_1.Router)();
// Routes
appRoutes.use("/dashboard/security/", gateway_1.default);
appRoutes.use("/dashboard/staff/", gateway_3.default);
appRoutes.use("/dashboard/store/", gateway_2.default);
exports.default = appRoutes;
