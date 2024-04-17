import mongoose, { Document, Schema } from "mongoose";
import { IAddressItem } from "../types/CustomerTypes";

const addressSchema = new Schema<IAddressItem>({
  departamento: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  localidad: {
    type: String,
    required: true,
  },
  barrio: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
});

const AddressItemModel = mongoose.model<IAddressItem>(
  "AddressItem",
  addressSchema
);

export default AddressItemModel;
