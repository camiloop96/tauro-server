"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateUser_1 = require("./controller/CreateUser");
const DeleteUser_1 = require("./controller/DeleteUser");
const UpdateUser_1 = require("./controller/UpdateUser");
const ListUser_1 = require("./controller/ListUser");
const DetailUser_1 = require("./controller/DetailUser");
const GetUserData_1 = require("./controller/GetUserData");
const UserRoutes = (0, express_1.Router)();
UserRoutes.post("/create/", CreateUser_1.CreateUser);
UserRoutes.delete("/delete/:id/", DeleteUser_1.DeleteUserById);
UserRoutes.put("/edit/:id", UpdateUser_1.UpdateUser);
UserRoutes.get("/all/", ListUser_1.ListUser);
UserRoutes.get("/detail/:id/", DetailUser_1.DetailUser);
UserRoutes.post("/data/by-token", GetUserData_1.GetUserData);
exports.default = UserRoutes;
