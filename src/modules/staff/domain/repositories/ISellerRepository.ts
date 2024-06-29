/**
 * @file ISellerRepository.ts
 * @description Interface defining the contract for seller repository methods. Provides methods for creating and retrieving sellers by employee ID.
 */

import { Types } from "mongoose";
import { Seller } from "../entities/Seller";

/**
 * Interface representing the seller repository.
 * Defines methods for interacting with seller data.
 */
export interface ISellerRepository {
  /**
   * Creates a new seller entry in the repository.
   *
   * @param {Types.ObjectId} employeeID - The ID of the employee associated with the seller.
   * @returns {Promise<void>} A promise that resolves when the seller entry is created.
   */
  createSeller(employeeID: Types.ObjectId): Promise<void>;

  /**
   * Retrieves a seller by their associated employee ID.
   *
   * @param {Types.ObjectId} employeeID - The ID of the employee associated with the seller.
   * @returns {Promise<Seller | null>} A promise that resolves to the seller entity or null if not found.
   */
  getSellerByEmployeeID(employeeID: Types.ObjectId): Promise<Seller | null>;
}
