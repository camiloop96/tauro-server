import { Types } from "mongoose";
import { Seller } from "../entities/Seller";

export interface ISellerRepository {
  createSeller(employeeID: Types.ObjectId): Promise<void>;
  getSellerByEmployeeID(employeeID: Types.ObjectId): Promise<Seller | null>;
}
