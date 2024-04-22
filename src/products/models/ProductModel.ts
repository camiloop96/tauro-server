import { Schema, model } from "mongoose";
import { IProduct } from "../types/ProductTypes";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const ProductModel = model<IProduct>("Product", productSchema);

export default ProductModel;
