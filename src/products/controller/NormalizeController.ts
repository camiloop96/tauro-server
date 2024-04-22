import { Request, Response } from "express";
import { getCurrentDate } from "../../utils/dateManager";
import ProductModel from "../models/ProductModel";

export const NormalizeController = async (req: Request, res: Response) => {
  console.log(`${getCurrentDate()} GET simora/api/product/normalize/`);
  const { products } = req.body;
  // Lista para almacenar los nombres de los productos que no se encontraron
  const notFoundProducts: string[] = [];
  
  try {
    // Lista para almacenar los productos encontrados
    const foundProducts: any[] = [];

    // Iterar sobre los productos recibidos
    for (const product of products) {
      // Buscar el producto en la colección de MongoDB
      const foundProduct = await ProductModel.findOne({name: product.name})
  
      // Si el producto no se encuentra, agregar su nombre a la lista de errores
      if (!foundProduct) {
        notFoundProducts.push(product.name);
      } else {
        // Si se encuentra, agregarlo a la lista de productos encontrados
        foundProducts.push({
          cantidad: product.cantidad,
          product: {
            _id: foundProduct._id,
            name: foundProduct.name,
            price: foundProduct.price,
          },
        });
      }
    }

    // Si hay productos que no se encontraron, devolver un mensaje de error
    if (notFoundProducts.length > 0) {
      return res.status(400).json({
        error: `Los siguientes productos no fueron encontrados: ${notFoundProducts.join(
          ", "
        )}`,
      });
    }

    // Si todos los productos se encontraron, devolver la lista de productos
    return res.status(200).json(foundProducts);
  } catch (error: any) {
    return res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
