import { Types } from "mongoose";
import {
  IAddressItem,
  ICustomer,
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
  comprobante: string;
}

export interface ICobro {
  subtotal: Types.Decimal128;
  IVA: number;
  total: Types.Decimal128;
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
