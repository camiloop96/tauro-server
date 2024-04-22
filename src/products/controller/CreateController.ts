import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import { getCurrentDate } from "../../utils/dateManager";

export const CreateProductController = async (req: Request, res: Response) => {
  console.log(`${getCurrentDate()} GET simora/api/product/create/`);
  try {
    // Extrae los datos del producto de la solicitud (request)
    const { nombre, precio } = req.body;

    // Comprobaciones de existencia
    if (!nombre) {
      return res.status(400).json({
        message: "Falta el campo nombre",
      });
    }
    if (!precio) {
      return res.status(400).json({
        message: "Falta el campo precio",
      });
    } else if (isNaN(precio)) {
      return res.status(400).json({
        message: "El campo precio debe ser número",
      });
    }

    // Comprobaciones de duplicidad
    const existingProduct = await ProductModel.findOne({ name: nombre });
    if (existingProduct) {
      return res.status(404).json({
        message: "El producto ya existe",
      });
    }

    // Crea una instancia del modelo de productos con los datos
    const newProduct = new ProductModel({
      createdAt: new Date(0),
      nombre,
      precio,
    });

    // Guarda el producto en la base de datos
    await newProduct.save();

    // Respuesta exitosa
    res.status(201).json({ message: "Producto guardado con éxito" });
  } catch (error: any) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
