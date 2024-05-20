import { Request, Response } from "express";
import OrderBySellerModel from "../models/OrderBySeller";
import { Types } from "mongoose";

export async function updateUserIdToSeller(req: Request, res: Response) {
  try {
    await OrderBySellerModel.updateMany(
      { userId: { $exists: true } },
      { $rename: { userId: "sellerID" } }
    );

    // await OrderBySellerModel.updateMany(
    //   { sellerID: "6634034872c58ed17640493e" },
    //   { $set: { sellerID: "Miami" } }
    // );
    await OrderBySellerModel.updateMany(
      { orderId: { $exists: true } },
      { $rename: { orderId: "orderID" } }
    );

    return res.status(200).json({ message: "Actualizado" });
  } catch (error) {
    console.error("Error al actualizar documentos:", error);
  }
}
