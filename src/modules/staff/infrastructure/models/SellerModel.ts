import { Schema, Types, model } from "mongoose";

export interface ISeller extends Document {
  employee: Types.ObjectId;
  active: boolean;
}

const sellerSchema = new Schema<ISeller>({
  employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  active: { type: Boolean, default: true },
});

const SellerModel = model<ISeller>("Seller", sellerSchema);

export { SellerModel };
