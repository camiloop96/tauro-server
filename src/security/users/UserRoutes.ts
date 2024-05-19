import { Router } from "express";
import { CreateUser } from "./controller/CreateUser";
import { DeleteUserById } from "./controller/DeleteUser";
import { UpdateUser } from "./controller/UpdateUser";
import { ListUser } from "./controller/ListUser";
import { DetailUser } from "./controller/DetailUser";
import { GetUserData } from "./controller/GetUserData";
import { updateFullNameToEmployee } from "./migrations/UpdateFullNameToEmployee";

const UserRoutes = Router();

UserRoutes.post("/create/", CreateUser);
UserRoutes.delete("/delete/:id/", DeleteUserById);
UserRoutes.put("/edit/:id", UpdateUser);
UserRoutes.get("/all/", ListUser);
UserRoutes.get("/detail/:id/", DetailUser);
UserRoutes.post("/data/by-token", GetUserData);

// Migrations
UserRoutes.get("/migrations/fullname", updateFullNameToEmployee);

export default UserRoutes;
