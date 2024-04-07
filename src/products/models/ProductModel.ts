import { Schema, model } from "mongoose";

export interface IProduct {
  name: string,
  price: number
}

const productSchema = new Schema<IProduct>(
  {
    name: String,
    price: Number,
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
