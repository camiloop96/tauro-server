import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

export const GetOrderInvoiceController = async (
  req: Request,
  res: Response
) => {
  let { id } = req.params;
  try {
    let findOrder = await OrderModel.findById(id);
    if (!findOrder) {
      return res.status(400).json({
        error: "No se encontraron pedidos asociados",
      });
    }
    if (findOrder.pago.comprobante.url === null) {
      return res.status(400).json({
        error: "No se encontró comprobante",
      });
    }
    return res.status(200).json(findOrder.pago.comprobante.url);
  } catch (error) {
    return res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
