import { Router } from "express";
import { DeleteUserById } from "./controller/DeleteUser";
import { UpdateUser } from "./controller/UpdateUser";
import { ListUser } from "./controller/ListUser";
import { DetailUser } from "./controller/DetailUser";
import { GetUserData } from "./controller/GetUserData";

const UserRoutes = Router();

UserRoutes.delete("/delete/:id/", DeleteUserById);
UserRoutes.put("/edit/:id", UpdateUser);
UserRoutes.get("/all/", ListUser);
UserRoutes.get("/detail/:id/", DetailUser);
UserRoutes.post("/data/by-token", GetUserData);

export default UserRoutes;
