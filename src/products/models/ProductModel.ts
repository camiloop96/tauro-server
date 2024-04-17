import { Schema, model } from "mongoose";
import { IProduct } from "../types/ProductTypes";

const productSchema = new Schema<IProduct>(
  {
    nombre: {
      type: String,
      required: true,
    },
    precio: {
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

const ProductModel = model<IProduct>("Producto", productSchema);

export default ProductModel;
