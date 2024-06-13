/**
 * @file Seller.ts
 * @description Defines the Seller class representing a seller entity.
 */

import { Types } from "mongoose";

/**
 * Class representing a seller.
 */
export class Seller {
  /**
   * Creates an instance of Seller.
   *
   * @param {Types.ObjectId} employee - The ID of the employee associated with the seller.
   * @param {boolean} [active] - Optional: Whether the seller is active.
   * @param {Types.ObjectId} [_id] - Optional: The ID of the seller.
   */
  constructor(
    public employee: Types.ObjectId,
    public active?: boolean,
    public _id?: Types.ObjectId
  ) {}
}
