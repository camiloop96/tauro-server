import { Request, Response } from "express";
import CustomerModel from "../../customer/models/CustomerModel";
import AddressItemModel from "../../customer/models/AdressItem";
import OrderModel from "../models/OrderModel";
import { IAddressItem, ICustomer } from "../../customer/types/CustomerTypes";
import ProductModel from "../../products/models/ProductModel";
import { generateUniqueGuideNumber } from "../guide/controller/guide";

export const CreateOrderController = async (req: Request, res: Response) => {
  try {
    // Desestructuracion de orden
    let { factura } = req.body || {};
    let { cliente, pedido, envio, pago, costos } = factura || {};

    if (!factura) {
      return res.status(400).json({
        error: "El formato de factura tiene error o no existe",
      });
    }

    // Desestructuración de cliente

    let { nombres, celular, cedula } = cliente || {};

    // Comprobacion de nulidad de cliente
    // Validacion del cliente
    /*  if (!cliente || nombres || !cliente.celular || !cliente.cedula) {
      return res.status(400).json({
        error: "Faltan datos del cliente o están incompletos",
      });
    } */

    console.log(envio.datos);

    if (
      !envio.datos.direccion ||
      !envio.datos.barrio ||
      !envio.datos.localidad ||
      !envio.datos.ciudad ||
      !envio.datos.departamento
    ) {
      return res.status(400).json({
        error: "La dirección de envío es incompleta",
      });
    }
    // Comprobacion de existencia de cliente
    let existingCustomer = await CustomerModel.findOne({
      celular: cliente.celular,
    });

    console.log(existingCustomer);

    // Desestructuracion de datos de envio
    let { datos } = envio || {};
    let datosEnvio: IAddressItem = datos;
    let direccion = datosEnvio.direccion;

    let createOrder = new OrderModel();

    let newCustomer;

    if (existingCustomer) {
      createOrder.cliente = existingCustomer._id;
      let arr: IAddressItem[] = [];
      let addressList = existingCustomer.addressList;
      for (let addressId of addressList) {
        let item = await AddressItemModel.findById(addressId);
        if (item) {
          arr.push(item);
        }
      }
      // Buscar cliente en la dirección en la lista de direcciones del cliente
      let existingAddress = arr.find((item) => item.direccion === direccion);
      if (existingAddress) {
        createOrder.envio.datos = existingAddress;
      } else {
        let envioData = {
          departamento: datosEnvio.departamento,
          ciudad: datosEnvio.ciudad,
          localidad: datosEnvio.localidad,
          barrio: datosEnvio.barrio,
          direccion: datosEnvio.direccion,
        };

        let newAddressItem = new AddressItemModel(envioData);

        await newAddressItem.save();
        existingCustomer.addressList.push(newAddressItem);

        await existingCustomer.save();
        createOrder.envio.datos = newAddressItem;
      }
    } else {
      let envioData = {
        departamento: datosEnvio.departamento,
        ciudad: datosEnvio.ciudad,
        localidad: datosEnvio.localidad,
        barrio: datosEnvio.barrio,
        direccion: datosEnvio.direccion,
      };

      let newAddressItem = await AddressItemModel.create(envioData);
      let newCustomerData: ICustomer = {
        nombres: cliente.nombres,
        cedula: cliente.cedula,
        celular: cliente.celular,
        addressList: [newAddressItem],
        created_at: new Date(0),
      };
      newCustomer = await CustomerModel.create(newCustomerData);
    }

    if (envio.datos) {
      createOrder.envio.info = envio.info;
      createOrder.envio.fechaEntrega = envio.fechaEntrega;
    }

    // Costos
    createOrder.costos = costos;

    // Pago
    createOrder.pago = pago;

    // Timestamp
    createOrder.created_at = new Date(0);

    // Productos
    let productos = pedido.productos;
    let arr = [];
    for (let itemProducto of productos) {
      let nombreProducto = itemProducto.product.nombre;
      let productExist = await ProductModel.findOne({ nombre: nombreProducto });
      if (productExist) {
        let ivaValue = productExist.precio * (19 / 100);
        let subtotal = productExist.precio * itemProducto.cantidad;
        let productoItem = {
          producto: productExist._id,
          cantidad: itemProducto.cantidad,
          base: subtotal - ivaValue,
          iva: ivaValue,
          total: subtotal,
          created_at: new Date(0),
        };
        arr.push(productoItem);
      }
    }

    // Ingresar productos al envio
    createOrder.pedido.productos = arr;
    createOrder.envio.guia = await generateUniqueGuideNumber();

    await createOrder.save();
    console.log(createOrder);

    res.status(200).json({
      message: "Pedido agendado con éxito",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
