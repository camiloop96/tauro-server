import { Request, Response } from "express";
import { getCurrentDate } from "../../utils/dateManager";
import CustomerModel from "../models/CustomerModel";
import AddressItemModel from "../models/AdressItem";

export const CustomerCreate = async (req: Request, res: Response) => {
  console.log(`${getCurrentDate()} POST simora/api/customer/create`);

  try {
    const { nombres, cedula, celular, datosEnvio } = req.body;

    console.log(nombres, celular, cedula, datosEnvio);

    // Verificar que se proporcionaron los campos obligatorios
    if (!nombres) {
      return res.status(400).json({ mensaje: "Faltan campo nombres" });
    }
    // Verificar que se proporcionaron los campos obligatorios
    if (!cedula) {
      return res.status(400).json({ mensaje: "Faltan campo cédula" });
    } // Verificar que se proporcionaron los campos obligatorios
    if (!celular) {
      return res.status(400).json({ mensaje: "Faltan campo celular" });
    } // Verificar que se proporcionaron los campos obligatorios
    if (!datosEnvio) {
      return res.status(400).json({ mensaje: "Faltan campo datosEnvio" });
    }

    // Verificar que el celular sea un número de 10 dígitos
    if (typeof celular !== "number" || celular.toString().length !== 10) {
      return res.status(400).json({
        mensaje: "El número de celular debe ser un número de 10 dígitos",
      });
    }

    // Address Exist
    let customerExist = await CustomerModel.findOne({ celular: celular });

    if (customerExist) {
      res.status(2000).json({ message: "Cliente existe" });
    } else {
      let createAddress = new AddressItemModel(datosEnvio);
      createAddress.save()
      console.log(createAddress);
      if (createAddress) {
        let createCustomer = new CustomerModel({
          nombres: nombres,
          cedula: cedula,
          celular: celular,
          addressList: [createAddress._id],
        });
        createCustomer.save();
        res.status(201).json({
          ok: true,
          msg: "Cliente creado con éxito",
          data: createCustomer._id,
        });
      }
    }
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
