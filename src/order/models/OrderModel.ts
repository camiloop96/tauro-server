import mongoose, { Schema } from "mongoose";
import { IOrden } from "../types/OrderTypes";
import { Types } from "mongoose";

const orderSchema = new Schema<IOrden>({
  IdFacturacion: {
    type: String,
  },
  cliente: {
    type: Types.ObjectId,
    ref: "Customer",
  },
  envio: {
    guia: String,
    fechaEntrega: {
      type: String,
      required: true,
    },
    datos: {
      _id: Types.ObjectId,
      departamento: {
        type: String,
      },
      ciudad: {
        type: String,
      },
      localidad: {
        type: String,
      },
      barrio: {
        type: String,
      },
      direccion: {
        type: String,
      },
    },
    info: {
      horario: {
        type: String,
      },
      infoAd: {
        type: String,
        default: null,
      },
    },
  },
  pedido: {
    productos: [
      {
        producto: {
          type: Types.ObjectId,
          ref: "Producto",
        },
        cantidad: {
          type: Number,
        },
        base: {
          type: Number,
        },
        iva: {
          type: Number,
        },
        total: {
          type: Number,
        },
        created_at: {
          type: Date,
        },
      },
    ],
  },

  pago: {
    tipo: {
      type: String,
      required: true,
    },
    comprobante: {
      type: String,
    },
  },
  costos: {
    envio: {
      type: Number,
      required: true,
    },
  },
  cobros: {
    cantProductos: { type: Number },
    subtotal: { type: Number },
    IVA: { type: Number },
    total: { type: Number },
  },
  created_at: {
    type: Date,
  },
});

const OrderModel = mongoose.model<IOrden>("Order", orderSchema);

export default OrderModel;
