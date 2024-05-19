import { Request, Response } from "express";
import { EmployeeModel } from "../models/EmployeeModel";
import { SellerModel } from "../../Seller/models/SellerModel";

export const CreateEmployee = async (req: Request, res: Response) => {
  const { name, lastName, DNI, branchStore, position } = req.body || {};

  try {
    let existingEmployee = await EmployeeModel.findOne({
      DNI: DNI,
    });
    if (existingEmployee) {
      return res.status(400).json({
        message: "Empleado ya existe",
      });
    }
    const newEmployee = new EmployeeModel({
      name,
      lastName,
      DNI,
      branchStore,
      position,
    });

    if (position === "seller") {
      let existSeller = await SellerModel.findOne({
        employee: newEmployee._id,
      });
      if (!existSeller) {
        await SellerModel.create({ employee: newEmployee._id });
      }
    }

    await newEmployee.save();
    res.status(200).json(newEmployee);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
