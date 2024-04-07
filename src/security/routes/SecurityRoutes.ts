import { Router } from "express";
import { CreateUser } from "../controller/User/CreateUser";
import { DeleteUserById } from "../controller/User/DeleteUser";
import { DetailUser } from "../controller/User/DetailUser";
import { ListUser } from "../controller/User/ListUser";
import { UpdateUser } from "../controller/User/UpdateUser";
import { LoginController } from "../controller/Authentication/Login";
import { LogoutController } from "../controller/Authentication/Logout";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { VerifyTokenController } from "../controller/Authentication/VerifyToken";
import { GetUsername } from "../controller/User/GetUsername";

// Router
const SecurityRoutes = Router();
const UserRoutes = Router();

// User
UserRoutes.post("/create/", CreateUser);
UserRoutes.delete("/delete/:id/", DeleteUserById);
UserRoutes.put("/edit/:id", UpdateUser);
UserRoutes.get("/all/", ListUser);
UserRoutes.get("/detail/:id/", DetailUser);
UserRoutes.post("/data/username/", GetUsername);

// Authentication
SecurityRoutes.post("/authentication/login/", LoginController);
SecurityRoutes.post("/authentication/logout/", LogoutController);
SecurityRoutes.post("/authentication/token/verify/", VerifyTokenController);
SecurityRoutes.use("/user/", authenticateToken, UserRoutes);

export default SecurityRoutes;
