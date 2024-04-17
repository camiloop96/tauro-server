import mongoose, { Schema, Types } from "mongoose";
import { IProductItem } from "../types/ProductTypes";

const productSchema: Schema = new Schema<IProductItem>(
  {
    producto: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    iva: {
      type: Types.Decimal128,
      required: true,
    },
    total: {
      type: Types.Decimal128,
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

const ProductItem = mongoose.model<IProductItem>("ProductItem", productSchema);

export default ProductItem;
