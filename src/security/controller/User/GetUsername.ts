import { Request, Response } from "express";
import { decodeToken } from "../../utils/tokenManager";
import UserModel from "../../models/UserModel";

export const GetUsername = async (req: Request, res: Response) => {
  let { token } = req.body;
  try {
    let decodedToken = await decodeToken(token);
    let username = await UserModel.findOne(decodedToken?._id);
    if (!username) {
      return res.status(500).json({
        error: "Error interno en el servidor",
      });
    }
    return res.status(200).json({
      username: username?.fullName,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
