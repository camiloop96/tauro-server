/**
 * @file Seller.ts
 * @description Defines the Mongoose schema and model for the Seller entity.
 */

import { Schema, Types, model, Document } from "mongoose";

/**
 * Interface representing a Seller document in MongoDB.
 */
export interface ISeller extends Document {
  employee: Types.ObjectId;
  active: boolean;
}

/**
 * Mongoose schema for the Seller entity.
 */
const sellerSchema = new Schema<ISeller>({
  employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  active: { type: Boolean, default: true },
});

/**
 * Mongoose model for the Seller entity.
 */
const SellerModel = model<ISeller>("Seller", sellerSchema);

export { SellerModel };
