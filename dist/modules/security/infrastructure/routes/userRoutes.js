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
// Modules
const express_1 = require("express");
const ListUserController_1 = require("../controllers/user/ListUserController");
const CreateUserController_1 = require("../controllers/user/CreateUserController");
// User routes instance router
const userRoutes = (0, express_1.Router)();
// Create user controller instances
const createUserController = new CreateUserController_1.CreateUserController();
const listUserController = new ListUserController_1.ListUserController();
userRoutes.post("/create/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield createUserController.execute(req, res);
}));
userRoutes.get("/all/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield listUserController.execute(req, res);
}));
// UserRoutes.delete("/delete/:id/", DeleteUserById);
// UserRoutes.put("/edit/:id", UpdateUser);
// UserRoutes.get("/detail/:id/", DetailUser);
// UserRoutes.post("/data/by-token", GetUserData);
// User export router
exports.default = userRoutes;
