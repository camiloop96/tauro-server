import { Request, Response } from "express";
import { getCurrentDate } from "../../utils/dateManager";

export const OrderList = async (req: Request, res: Response) => {
    console.log(`${getCurrentDate()} GET api/pos/order/list/by-date/${req.params.date}`);
    let { date } =  req.params;
  
   /*  try {
      let Orders = await Order.find({ fechaEntrega: date }).populate("idCliente");
  
      let orderList = [];
  
      let obOrder = {
        guia: null,
        id: null,
        departamento: null,
        ciudad: null,
        localidad: null,
        barrio: null,
        direccion: null,
        horario: null,
        envio: 0,
        base: null,
        ivaTotal: null,
        total: null,
        fechaEntrega: null,
        infoAdic: null,
        pago: null,
        origen: null,
        estado: null,
        nombres: null,
        cedula: null,
        celular: null,
        subtotal: null,
      };
  
      for (let i = 0; i < Orders.length; i++) {
        const element = Orders[i];
        obOrder = {
          id: element._id,
          guia: element.guia,
          fechaEntrega: element.fechaEntrega,
          nombres: element.idCliente.nombres,
          celular: element.idCliente.celular,
          cedula: element.idCliente.cedula,
          departamento: element.departamento,
          ciudad: element.ciudad,
          localidad: element.localidad,
          barrio: element.barrio,
          direccion: element.direccion,
          subtotal: parseFloat(element.subtotal),
          envio: element.envio,
          total: parseFloat(element.total),
          infoAdic: element.infoAdic,
          pago: element.pago,
          horario: element.horario,
        };
        orderList.push(obOrder);
      }
      res.status(200).json({
        ok: true,
        msg: "Pedidos obtenidos con exito",
        data: orderList,
      });
    } catch (error) {
      if (error) {
        res.status(500).json({
          ok: false,
          msg: "Error interno del servidor",
        });
      }
    } */
  };