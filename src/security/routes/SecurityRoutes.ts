import { Router } from "express";
import { CreateUser } from "../controller/User/CreateUser";
import { DeleteUserById } from "../controller/User/DeleteUser";
import { DetailUser } from "../controller/User/DetailUser";
import { ListUser } from "../controller/User/ListUser";
import { UpdateUser } from "../controller/User/UpdateUser";
import { LoginController } from "../controller/Authentication/Login";
import { LogoutController } from "../controller/Authentication/Logout";

// Router
const SecurityRoutes = Router();

// Authentication
SecurityRoutes.post("/authentication/login/", LoginController);
SecurityRoutes.post("/authentication/logout/", LogoutController);

// User
SecurityRoutes.post("/user/create/", CreateUser);
SecurityRoutes.delete("/user/delete/:id/", DeleteUserById);
SecurityRoutes.put("/user/edit/:id", UpdateUser);
SecurityRoutes.get("/user/list/", ListUser);
SecurityRoutes.get("/user/detail/:id/", DetailUser);

export default SecurityRoutes;
