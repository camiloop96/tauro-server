import { Request, Response } from "express";
import { decodeToken } from "../../utils/tokenManager";
import UserModel from "../models/UserModel";
import { getCurrentDate } from "../../../utils/dateManager";
import { EmployeeModel } from "../../../staff/Employee/models/EmployeeModel";
import { BranchStoreModel } from "../../../store/branch/models/BranchModel";
import { SellerModel } from "../../../staff/Seller/models/SellerModel";
import { IUserQueryData } from "../types/UserTypes";

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
      "_id employee"
    );

    if (!user) {
      return res.status(400).json({
        error: "No hay usuario asociado",
      });
    }

    // Validacion de empleado
    let findEmployee: any = await EmployeeModel.findById(user?.employee);
    if (!findEmployee) {
      return res.status(400).json({
        error: "No hay empleado asociado",
      });
    }

    // Busqueda de Vendedor y Sucursal
    let findBranchStore = await BranchStoreModel.findById(
      findEmployee?.branchStore
    );
    let findSeller = await SellerModel.findOne({
      employee: findEmployee._id,
    });

    let userData: IUserQueryData = {
      _id: findEmployee?._id,
      fullName: `${findEmployee?.name} ${findEmployee?.lastName}`,
      cityBranchStore: {
        name: findBranchStore?.name,
        city: findBranchStore?.city,
      },
      sellerID: findSeller ? findSeller?._id : null,
    };

    return res.status(200).json(userData);
  } catch (error: any) {
    return res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
