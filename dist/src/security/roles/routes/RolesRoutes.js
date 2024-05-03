"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ListRoles_1 = require("../controller/ListRoles");
const DetailRole_1 = require("../controller/DetailRole");
const UpdateRole_1 = require("../controller/UpdateRole");
const DeleteRole_1 = require("../controller/DeleteRole");
const GetRoleFromToken_1 = require("../controller/GetRoleFromToken");
const GetUserByRole_1 = require("../controller/GetUserByRole");
// Creación del enrutador
const RolesRoutes = (0, express_1.Router)();
// Definición de las rutas
// RolesRoutes.post("/create", CreateRole);
RolesRoutes.get("/all", ListRoles_1.ListRoles);
RolesRoutes.get("/detail/:id", DetailRole_1.DetailRole);
RolesRoutes.put("/update/:id", UpdateRole_1.UpdateRole);
RolesRoutes.delete("/delete/:id", DeleteRole_1.DeleteRole);
// Rutas Roles 
RolesRoutes.get("/roles/list-by-id/:roleId", GetUserByRole_1.GetUsersByRole);
RolesRoutes.post("/roles/get-role", GetRoleFromToken_1.GetRoleFromToken);
exports.default = RolesRoutes;
