"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = require("../controllers/authentication/LoginController");
const VerifyTokenController_1 = require("../controllers/authentication/VerifyTokenController");
// Create routes instance router
const authenticationRoutes = (0, express_1.Router)();
// Create authentication controller instances
const loginController = new LoginController_1.LoginController();
const verifyTokenController = new VerifyTokenController_1.VerifyTokenController();
// Routes
authenticationRoutes.post("/login/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield loginController.execute(req, res);
}));
authenticationRoutes.post("/token/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield verifyTokenController.execute(req, res);
}));
exports.default = authenticationRoutes;
