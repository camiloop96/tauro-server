import { Types } from "mongoose";

export interface IAddressItem extends Document {
  _id: Types.ObjectId;
  departamento?: string;
  ciudad?: string;
  region?: Types.ObjectId
  localidad: string;
  barrio: string;
  direccion: string;
}

export interface AddressListItem extends IAddressItem {}

export interface ICustomerId {
  _id?: Types.ObjectId;
}

export interface ICustomer {
  _id?: ICustomerId;
  nombres: string;
  cedula: number;
  celular: number;
  addressList: IAddressItem[];
  created_at: Date;
}
