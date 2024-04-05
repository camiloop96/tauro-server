import { Request, Response } from "express";
import UserModel from "../../models/UserModel";

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullName } = req.body;
    if (!fullName) {
      return res.status(400).json({
        message: "Falta el campo de nombre",
      });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { fullName },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario actualizado" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
