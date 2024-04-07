import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import { getCurrentDate } from "../../utils/dateManager";

export const CreateProductController = async (req: Request, res: Response) => {
  console.log(`${getCurrentDate()} GET simora/api/product/create/`);
  try {
    // Extrae los datos del producto de la solicitud (request)
    const { name, price } = req.body;

    // Comprobaciones de existencia
    if (!name) {
      return res.status(400).json({
        message: "Falta el campo nombre",
      });
    }
    if (!price) {
      return res.status(400).json({
        message: "Falta el campo precio",
      });
    } else if (isNaN(price)) {
      return res.status(400).json({
        message: "El campo precio debe ser número",
      });
    }

    // Comprobaciones de duplicidad
    const existingProduct = await ProductModel.findOne({ name });
    if (existingProduct) {
      return res.status(404).json({
        message: "El producto ya existe",
      });
    }

    // Crea una instancia del modelo de productos con los datos
    const newProduct = new ProductModel({
      createdAt: new Date(0),
      name,
      price,
    });

    // Guarda el producto en la base de datos
    await newProduct.save();

    // Respuesta exitosa
    res.status(201).json({ message: "Producto guardado con éxito" });
  } catch (error: any) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
