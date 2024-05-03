import { Request, Response } from "express";
import { decodeToken } from "../../utils/tokenManager";
import UserModel from "../models/UserModel";
import { getCurrentDate } from "../../../utils/dateManager";

export const GetUserData = async (req: Request, res: Response) => {
  console.log(
    `${getCurrentDate()} ${
      req.method
    } simora/api/authentication/security/user/data/by-token`
  );

  let { token } = req.body;
  try {
    let decodedToken = await decodeToken(token);

    let user = await UserModel.findById(decodedToken?.userId).select(
      "_id fullName"
    );

    if (!user) {
      return res.status(400).json({
        error: "No hay usuario asociado",
      });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
