import { Request, Response } from "express";
import { getCurrentDate } from "../../utils/dateManager";
import OrderModel from "../models/OrderModel";
import GuideModel from "../guide/models/guide";

export const DeleteOrderController = async (req: Request, res: Response) => {
  console.log(`${getCurrentDate()} POST api/order/delete/`);
  let data = req.body;

  try {
    if (!data) {
      return res.status(400).json({
        error: "Selecciona al menos un pedido para eliminar",
      });
    }
    for (const orderItem of data) {
      // Encuentra el order por su _id
      console.log(orderItem);

      const order = await OrderModel.findById(orderItem);

      console.log(order);

      if (!order) {
        console.log(`order con _id ${orderItem} no encontrado.`);
        continue;
      }

      // Elimina rl numero de guia
      let orderGuide = order.envio.guia;
      await GuideModel.findOneAndDelete({ number: orderGuide });

      // Elimina el order principal
      await OrderModel.findByIdAndDelete(orderItem);
      console.log(`Orden con _id ${orderItem} eliminado correctamente.`);
    }
    res.status(200).json({ msg: "Pedidos eliminados correctamente" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
