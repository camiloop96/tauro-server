import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

export const UpdateCusProperty = async (req: Request, res: Response) => {
  try {
    // Actualiza todos los documentos en la colección "orders"
    await OrderModel.updateMany({}, { $set: { "pago.comprobante.cus": null } });

    res.json({ message: "Actualización exitosa" });
  } catch (error) {
    console.error("Error al actualizar documentos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
