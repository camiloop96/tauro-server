import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";
import { IQueryOrderDetail } from "../types/OrderTypes";
import ProductModel from "../../products/models/ProductModel";
import { getCurrentDate } from "../../utils/dateManager";

export const DetailOrderController = async (req: Request, res: Response) => {
  console.log(
    `${getCurrentDate()} GET api/pos/order/detail/${req.params.date}`
  );
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(400).json({
        error: "ID no proporcionado",
      });
    }

    let existingOrder = await OrderModel.findById(id);
    if (!existingOrder) {
      return res.status(400).json({
        error: "Orden no encontrada",
      });
    }

    let productArr = [];
    for (let product of existingOrder.pedido.productos) {
      let existingProduct = await ProductModel.findById(
        product.producto
      ).select("name price");

      if (existingProduct) {
        let item = {
          cantidad: product.cantidad,
          total: product.total,
          product: existingProduct,
        };
        productArr.push(item);
      } else {
        throw new Error("Producto no existe");
      }
    }

    let orderDetail: IQueryOrderDetail = {
      guia: existingOrder.envio.guia,
      fechaEntrega: existingOrder.envio.fechaEntrega,
      subtotal: existingOrder.cobros.subtotal,
      envio: existingOrder.costos.envio,
      total: existingOrder.cobros.total,
      product: productArr,
    };

    return res.status(200).json(orderDetail);
  } catch (error) {
    return res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
