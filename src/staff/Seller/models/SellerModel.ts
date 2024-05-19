// src/models/Branch.ts
import { Schema, model } from "mongoose";
import { ISeller } from "../types/SellerTypes";

const sellerSchema = new Schema<ISeller>({
  employee: { type: Schema.ObjectId, required: true },
  active: { type: Boolean, default: true },
});

const SellerModel = model<ISeller>("Seller", sellerSchema);

export { SellerModel };
