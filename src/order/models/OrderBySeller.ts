import mongoose, { Schema, Document } from "mongoose";
import { IUserByOrder } from "../types/OrderTypes";

// Definición del esquema de la colección
const orderBySellerSchema: Schema<IUserByOrder> = new Schema<IUserByOrder>({
  sellerID: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
  orderID: { type: Schema.Types.ObjectId, ref: "Order", required: true },
});

// Creación del modelo
const OrderBySellerModel = mongoose.model<IUserByOrder>(
  "OrderBySeller",
  orderBySellerSchema
);

export default OrderBySellerModel;
