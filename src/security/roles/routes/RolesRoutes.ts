import { Router } from "express";
import { CreateRole } from "../controller/CreateRole";
import { ListRoles } from "../controller/ListRoles";
import { DetailRole } from "../controller/DetailRole";
import { UpdateRole } from "../controller/UpdateRole";
import { DeleteRole } from "../controller/DeleteRole";
import { GetRoleFromToken } from "../controller/GetRoleFromToken";
import { GetUsersByRole } from "../controller/GetUserByRole";

// Creación del enrutador
const RolesRoutes = Router();

// Definición de las rutas
RolesRoutes.post("/create", CreateRole);
RolesRoutes.get("/all", ListRoles);
RolesRoutes.get("/detail/:id", DetailRole);
RolesRoutes.put("/update/:id", UpdateRole);
RolesRoutes.delete("/delete/:id", DeleteRole);

// Rutas Roles 
RolesRoutes.get("/roles/list-by-id/:roleId", GetUsersByRole);
RolesRoutes.post("/roles/get-role", GetRoleFromToken);

export default RolesRoutes;
