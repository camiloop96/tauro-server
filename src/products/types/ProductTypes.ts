import { Types } from "mongoose";

export interface IProduct {
  nombre: string;
  precio: number;
}

export interface IProductItem {
  _id?: Types.ObjectId;
  producto: Types.ObjectId | IProduct;
  cantidad: number;
  base?: number;
  iva?: number;
  total?: number;
  created_at: Date;
}
