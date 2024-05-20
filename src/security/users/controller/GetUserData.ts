import { Request, Response } from "express";
import { decodeToken } from "../../utils/tokenManager";
import UserModel from "../models/UserModel";
import { getCurrentDate } from "../../../utils/dateManager";
import { EmployeeModel } from "../../../staff/Employee/models/EmployeeModel";
import { BranchStoreModel } from "../../../store/branch/models/BranchModel";

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

    let findEmployee = await EmployeeModel.findById(user?.employee);

    let userData;
    if (findEmployee !== null) {
      let findBranchStore = await BranchStoreModel.findById(
        findEmployee?.branchStore
      );

      userData = {
        _id: findEmployee?._id,
        fullName: `${findEmployee?.name} ${findEmployee?.lastName}`,
        cityBranchStore: {
          name: findBranchStore?.name,
          city: findBranchStore?.city,
        },
      };
    }
    return res.status(200).json(userData);
  } catch (error: any) {
    return res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
