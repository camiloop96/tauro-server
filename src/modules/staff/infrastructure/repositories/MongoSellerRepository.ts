import { Seller } from "@modules/staff/domain/entities/Seller";
import { ISellerRepository } from "@modules/staff/domain/repositories/ISellerRepository";
import { AppError } from "@shared/errors/AppError";
import { Types, isValidObjectId } from "mongoose";
import { SellerModel } from "../models/SellerModel";

export class MongoSellerRepository implements ISellerRepository {
  async getSellerByEmployeeID(
    employeeID: Types.ObjectId
  ): Promise<Seller | null> {
    try {
      if (!employeeID || !isValidObjectId(employeeID)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      const findSeller: Seller | null = await SellerModel.findOne({
        employee: employeeID,
      });

      if (findSeller) {
        return findSeller;
      } else {
        return null;
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching seller", 500);
      }
    }
  }
  async createSeller(employeeID: Types.ObjectId): Promise<void> {
    try {
      if (!employeeID || !isValidObjectId(employeeID)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      let createSeller = new SellerModel({
        employee: employeeID,
      });
      await createSeller.save();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error creating seller", 500);
      }
    }
  }
}
