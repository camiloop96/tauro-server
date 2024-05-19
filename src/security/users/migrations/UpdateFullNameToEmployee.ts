import { Request, Response } from "express";
import UserModel from "../models/UserModel";

export async function updateFullNameToEmployee(req: Request, res: Response) {
  try {
    await UserModel.updateMany(
      { fullName: { $exists: true } },
      { $rename: { fullName: "employee" } }
    );

    return res.status(200).json({ message: "Actualizado" });
  } catch (error) {
    console.error("Error al actualizar documentos:", error);
  }
}
