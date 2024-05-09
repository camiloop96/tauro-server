import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

export const ValidateInvoiceOrder = async (req: Request, res: Response) => {
  try {
    let { id } = req.params || {};
    let { cus } = req.body || {};

    if (!cus) {
      return res.status(400).json({
        error: "Debe ingresar un cus válido",
      });
    }
    if (!id) {
      return res.status(400).json({
        error: "Falta id en parametros",
      });
    }
    let existingOrder = await OrderModel.findById(id);

    if (!existingOrder) {
      return res.status(400).json({
        error: "Pedido no existe",
      });
    }

    // Actualiza estado validación
    existingOrder.pago.comprobante.validated = true;
    existingOrder.pago.comprobante.cus = cus;

    existingOrder.save();

    return res.status(200).json({
      message: "Pago validado",
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
