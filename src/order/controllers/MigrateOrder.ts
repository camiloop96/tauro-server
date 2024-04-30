// Migración de datos
import { Request, Response } from "express";
import CoverageCitiesModel from "../../shipping/CoverageCities/models/CoverageCitiesModel";
import OrderModel from "../models/OrderModel";
import OrderMigrateModel from "../models/OrderModelMigrate";

export const MigrateOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();

    for (const order of orders) {
      let departamentoFind = order?.envio?.datos?.departamento;
      let ciudadFind = order?.envio?.datos?.ciudad;

      console.log("departamento: ", departamentoFind, "ciudad: ", ciudadFind);

      const region = await CoverageCitiesModel.findOne({
        ciudad: ciudadFind,
        departamento: departamentoFind,
      });
      if (region) {
        const orderMigrate = new OrderMigrateModel({
          envio: {
            datos: {
              region: region._id,
              ...order.envio.datos,
            },
            info: order.envio.info,
            fechaEntrega: order.envio.fechaEntrega,
            guia: order.envio.guia,
          },
          pedido: order.pedido,
          pago: order.pago,
          costos: order.costos,
          cobros: order.cobros,
          cliente: order.cliente,
          created_at: order.created_at,
          __v: order.__v,
        });

        await orderMigrate.save();
      }

    }
    return res.status(200).json({ message: "Migración finalizada" });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
