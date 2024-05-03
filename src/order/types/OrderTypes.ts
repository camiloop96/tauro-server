import { Document, Types } from "mongoose";
import {
  IAddressItem,
  ICustomerId,
} from "../../customer/types/CustomerTypes";
import { IProductItem } from "../../products/types/ProductTypes";

export interface IEnvio {
  guia: string;
  fechaEntrega: string;
  datos: IAddressItem;
  info: {
    horario: string | null;
    infoAd: string | null;
  };
}

export interface IPago {
  tipo: string;
  comprobante: {
    url: string | null;
    asset_id: string | null;
    validated: boolean | null;
  };
}

export interface ICobro {
  cantProductos: number;
  subtotal: number;
  IVA: number;
  total: number;
}

export interface IOrden {
  IdFacturacion?: string;
  cliente: ICustomerId;
  envio: IEnvio;
  pedido: {
    productos: IProductItem[];
  };
  pago: IPago;
  costos: {
    envio: number;
  };
  cobros: ICobro;
  created_at: Date;
}

export interface OrderQuery {
  _id?: Types.ObjectId;
  fechaEntrega?: string;
  guia?: string;
  nombres?: string;
  celular?: number;
  cedula?: number;
  departamento?: string;
  ciudad?: string;
  localidad?: string;
  barrio?: string;
  direccion?: string;
  subtotal?: number;
  envio?: number;
  total?: number;
  infoAdic?: string | null;
  horario?: string | null;
  medioPago?: string;
  comprobante?: string;
  validated?: boolean | null;
}

export interface IQueryOrderDetail {
  guia: string;
  fechaEntrega: string;
  subtotal: number;
  envio: number;
  total: number;
  product: any;
}

export interface IUserByOrder extends Document {
  userId: Types.ObjectId;
  orderId: Types.ObjectId;
}

