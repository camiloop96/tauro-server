/**
 * @file MongoSellerRepository.ts
 * @description Implements the ISellerRepository interface for interacting with Seller data in MongoDB.
 */

import { Seller } from "@modules/staff/domain/entities/Seller";
import { ISellerRepository } from "@modules/staff/domain/repositories/ISellerRepository";
import { AppError } from "@shared/errors/AppError";
import { Types, isValidObjectId } from "mongoose";
import { SellerModel } from "../models/SellerModel";

/**
 * Class representing a repository for managing Seller entities in MongoDB.
 * @implements {ISellerRepository}
 */
export class MongoSellerRepository implements ISellerRepository {
  /**
   * Fetches a seller by their employee ID.
   * @param employeeID - The ObjectId of the employee.
   * @returns A promise that resolves to a Seller entity or null if not found.
   * @throws {AppError} Throws an error if the employee ID is invalid or if fetching fails.
   */
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

  /**
   * Creates a new seller with the given employee ID.
   * @param employeeID - The ObjectId of the employee.
   * @returns A promise that resolves when the seller is created.
   * @throws {AppError} Throws an error if the employee ID is invalid or if creating fails.
   */
  async createSeller(employeeID: Types.ObjectId): Promise<void> {
    try {
      if (!employeeID || !isValidObjectId(employeeID)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      const createSeller = new SellerModel({
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
