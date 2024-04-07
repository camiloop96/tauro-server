"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateUser_1 = require("../controller/User/CreateUser");
const DeleteUser_1 = require("../controller/User/DeleteUser");
const DetailUser_1 = require("../controller/User/DetailUser");
const ListUser_1 = require("../controller/User/ListUser");
const UpdateUser_1 = require("../controller/User/UpdateUser");
const Login_1 = require("../controller/Authentication/Login");
const Logout_1 = require("../controller/Authentication/Logout");
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const VerifyToken_1 = require("../controller/Authentication/VerifyToken");
const GetUsername_1 = require("../controller/User/GetUsername");
// Router
const SecurityRoutes = (0, express_1.Router)();
const UserRoutes = (0, express_1.Router)();
// User
UserRoutes.post("/create/", CreateUser_1.CreateUser);
UserRoutes.delete("/delete/:id/", DeleteUser_1.DeleteUserById);
UserRoutes.put("/edit/:id", UpdateUser_1.UpdateUser);
UserRoutes.get("/all/", ListUser_1.ListUser);
UserRoutes.get("/detail/:id/", DetailUser_1.DetailUser);
UserRoutes.post("/data/username/", GetUsername_1.GetUsername);
// Authentication
SecurityRoutes.post("/authentication/login/", Login_1.LoginController);
SecurityRoutes.post("/authentication/logout/", Logout_1.LogoutController);
SecurityRoutes.post("/authentication/token/verify/", VerifyToken_1.VerifyTokenController);
SecurityRoutes.use("/user/", authenticateToken_1.authenticateToken, UserRoutes);
exports.default = SecurityRoutes;
