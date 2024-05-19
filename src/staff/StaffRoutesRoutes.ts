import { Router } from "express";
import EmployeeRoutes from "./Employee/EmployeeRoutes";
import SellerRoutes from "./Seller/SellerRoutes";

const StaffRoutes = Router();

StaffRoutes.use("/employee/", EmployeeRoutes);
StaffRoutes.use("/employee/seller/", SellerRoutes);

export default StaffRoutes;
