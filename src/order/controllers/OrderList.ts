import { Request, Response } from "express";
import { getCurrentDate } from "../../utils/dateManager";
import OrderModel from "../models/OrderModel";
import CustomerModel from "../../customer/models/CustomerModel";
import { OrderQuery } from "../types/OrderTypes";

export const OrderList = async (req: Request, res: Response) => {
  console.log(
    `${getCurrentDate()} GET api/pos/order/list/by-date/${req.params.date}`
  );
  let { date } = req.params;

  if (!date) {
    return res.status(400).json({
      error: "Falta campo de fecha",
    });
  }

  try {
    let OrderList = await OrderModel.find({
      "envio.fechaEntrega": date,
    });

    let arrEntregas = [];

    for (let order of OrderList) {
      let orderObj: OrderQuery = {};
      let customerData = await CustomerModel.findOne({ _id: order.cliente });
      orderObj._id = order?._id;
      orderObj.fechaEntrega = order?.envio?.fechaEntrega,
      orderObj.guia = order?.envio?.guia;
      orderObj.nombres = customerData?.nombres;
      orderObj.celular = customerData?.celular;
      orderObj.cedula = customerData?.cedula;
      orderObj.departamento = order?.envio?.datos.departamento;
      orderObj.ciudad = order?.envio?.datos?.ciudad;
      orderObj.localidad = order?.envio?.datos?.localidad;
      orderObj.barrio = order?.envio?.datos?.barrio;
      orderObj.direccion = order?.envio?.datos?.direccion;
      orderObj.subtotal = order?.cobros?.subtotal;
      orderObj.envio = order?.costos?.envio;
      orderObj.total = order?.cobros?.total;
      orderObj.medioPago = order?.pago?.tipo;
      orderObj.infoAdic = order?.envio?.info?.infoAd
      orderObj.horario = order?.envio?.info?.horario
      arrEntregas.push(orderObj);
    }

    res.status(200).json(arrEntregas);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
