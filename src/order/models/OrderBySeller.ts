import mongoose, { Schema, Document } from "mongoose";
import { IUserByOrder } from "../types/OrderTypes";

// Definición del esquema de la colección
const orderBySellerSchema: Schema<IUserByOrder> = new Schema<IUserByOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
});

// Creación del modelo
const OrderBySellerModel = mongoose.model<IUserByOrder>(
  "OrderBySeller",
  orderBySellerSchema
);

export default OrderBySellerModel;
