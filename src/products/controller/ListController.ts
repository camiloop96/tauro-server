import { Request, Response } from "express";
import { getCurrentDate } from "../../utils/dateManager";
import ProductModel from "../models/ProductModel";

export const ListProductsController = async (req: Request, res: Response) => {
    console.log(`${getCurrentDate()} GET simora/api/product/all/`);
    try {
      // Consulta todos los productos en la base de datos
      const productos = await ProductModel.find();
  
      // Envía la lista de productos como respuesta
      res.status(200).json(productos);
    } catch (error) {
      // Manejo de errores
      console.error("Error al obtener los productos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };