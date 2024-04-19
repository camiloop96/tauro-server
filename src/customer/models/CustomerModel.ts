import mongoose, { Document, Schema, Types } from "mongoose";
import { ICustomer } from "../types/CustomerTypes";

const customerSchema = new Schema<ICustomer>({
  nombres: String,
  cedula: Number,
  celular: Number,
  addressList: [
    {
      type: Types.ObjectId,
      ref: "AddressItem",
    },
  ],
  created_at: String,
});

const CustomerModel = mongoose.model<ICustomer>("Customer", customerSchema);

export default CustomerModel;
