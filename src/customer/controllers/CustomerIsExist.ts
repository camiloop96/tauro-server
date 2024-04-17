import { Request, Response } from "express";
import CustomerModel from "../models/CustomerModel";
import { getCurrentDate } from "../../utils/dateManager";

export const CustomerExist = async (req: Request, res: Response) => {
  console.log(
    `${getCurrentDate()} POST simora/api/customer/verification/exist`
  );
  let { celular } = req.body || {};
  try {
    let clientExist = await CustomerModel.findOne({ celular: celular });
    if (clientExist) {
      res.status(200).json(clientExist);
    } else {
      res.status(400).json({
        error: "El cliente no existe",
      });
    }
  } catch (error) {
    console.error("Error al consultar cliente:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
