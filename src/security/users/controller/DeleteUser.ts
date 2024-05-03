import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import CredentialsModel from "../../models/CredentialModel";

export const DeleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const credential = await CredentialsModel.findOne({ user: user._id });
    if (credential) {
      await CredentialsModel.findByIdAndDelete(credential._id);
    }
    await UserModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Usuario y credencial asociada eliminados con éxito" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


