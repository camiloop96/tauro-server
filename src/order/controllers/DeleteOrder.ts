import { Request, Response } from "express";
import { getCurrentDate } from "../../utils/dateManager";
import OrderModel from "../models/OrderModel";
import GuideModel from "../guide/models/guide";
import { deleteImagefromCloudinary } from "../../utils/saveImageToCloudinary";

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
      const order = await OrderModel.findById(orderItem);

      if (!order) {
        console.log(`order con _id ${orderItem} no encontrado.`);
        continue;
      }
      // Eliminar comprobante
      if (order.pago.tipo === "Anticipado") {
        let parseId = order._id.toString();
        let deleteInvoiceFromCloudinary = await deleteImagefromCloudinary(
          "pos/order/invoice/",
          parseId
        );
        if (deleteInvoiceFromCloudinary.result !== "ok") {
          return res.status(400).json({
            error: "Error interno con el servidor de comprobantes",
          });
        }
      }

      //Elimina el numero de guia
      let orderGuide = order.envio.guia;
      await GuideModel.findOneAndDelete({ number: orderGuide });

      // Elimina el order principal
      await OrderModel.findByIdAndDelete(orderItem);
    }
    res.status(200).json({ msg: "Pedidos eliminados correctamente" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
