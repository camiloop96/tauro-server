import { Request, Response } from "express";
import { getCurrentDate } from "../../utils/dateManager";
import CustomerModel from "../models/CustomerModel";
import AddressItemModel from "../models/AdressItem";
import { AddressListItem, IAddressItem } from "../types/CustomerTypes";

export const GetAddressList = async (req: Request, res: Response) => {
  console.log(
    `${getCurrentDate()} POST simora/api/customer/verification/delivery/data/list/`
  );
  let { id } = req.params || {};
  if (!id) {
    return res.status(400).json({
      error: "Id es requerido",
    });
  }
  try {
    let customerExist = await CustomerModel.findOne({ _id: id });
    if (!customerExist) {
      return res.status(404).json({
        error: "Cliente no existe",
      });
    }

    let addressList: IAddressItem[] = [];
    if (customerExist.addressList && customerExist.addressList.length > 0) {
      addressList = await Promise.all(
        customerExist.addressList.map(async (address: IAddressItem) => {
          const addressItem: IAddressItem | null =
            await AddressItemModel.findOne({ _id: address._id });
          return addressItem as AddressListItem;
        })
      );
    } else {
      return res.status(500).json({
        error: "Error 600",
      });
    }

    return res.status(200).json(addressList);
  } catch (error) {
    console.error("Error al consultar cliente:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
