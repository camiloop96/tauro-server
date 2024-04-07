import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProductItem extends Document {
  product: Types.ObjectId;
  cant: number;
  base: Types.Decimal128;
  subtotal: Types.Decimal128;
  iva: Types.Decimal128;
  total: Types.Decimal128;
  created_at: Date;
  updated_at: Date;
}

const productSchema: Schema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    cant: {
      type: Number,
      required: true,
    },
    base: {
      type: Types.Decimal128,
      required: true,
    },
    subtotal: {
      type: Types.Decimal128,
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
