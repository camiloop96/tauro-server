import { Schema, Document, Types, model } from "mongoose";
import { IProductItem } from "../../products/models/ProductItem";


export interface IOrder extends Document {
  guia: string;
  ciudad: string;
  departamento?: string;
  direccion: string;
  localidad: string;
  barrio: string;
  horario: string;
  created_at: string;
  productItems: Types.ObjectId[] | IProductItem[];
  envio: number;
  total: Types.Decimal128;
  fechaEntrega: string;
  infoAdic: string;
  pago?: string;
  origen: string;
  estado: string;
  idCliente: Types.ObjectId;
  subtotal: Types.Decimal128;
}

const orderSchema: Schema = new Schema<IOrder>(
  {
    guia: { type: String, required: true },
    ciudad: { type: String, required: true },
    departamento: { type: String, default: "Cundinamarca" },
    direccion: { type: String, required: true },
    localidad: { type: String, required: true },
    barrio: { type: String, required: true },
    horario: { type: String, required: true },
    created_at: { type: String, required: true },
    productItems: [{ type: Schema.Types.ObjectId, ref: "ProductItem" }],
    envio: { type: Number, required: true },
    total: { type: Types.Decimal128, required: true },
    fechaEntrega: { type: String, required: true },
    infoAdic: { type: String, required: true },
    pago: { type: String, default: "Contraentrega" },
    origen: { type: String, required: true },
    estado: { type: String, required: true },
    idCliente: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    subtotal: { type: Types.Decimal128, required: true },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
