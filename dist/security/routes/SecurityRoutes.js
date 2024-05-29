"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_1 = require("../controller/Authentication/Login");
const Logout_1 = require("../controller/Authentication/Logout");
const VerifyToken_1 = require("../controller/Authentication/VerifyToken");
const RolesRoutes_1 = __importDefault(require("../roles/routes/RolesRoutes"));
const UserRoutes_1 = __importDefault(require("../users/UserRoutes"));
// Router
const SecurityRoutes = (0, express_1.Router)();
// Authentication
SecurityRoutes.post("/authentication/login/", Login_1.LoginController);
SecurityRoutes.post("/authentication/logout/", Logout_1.LogoutController);
SecurityRoutes.post("/authentication/token/verify/", VerifyToken_1.VerifyTokenController);
// User
SecurityRoutes.use("/user/", UserRoutes_1.default);
// Roles
SecurityRoutes.use("/roles/", RolesRoutes_1.default);
exports.default = SecurityRoutes;
