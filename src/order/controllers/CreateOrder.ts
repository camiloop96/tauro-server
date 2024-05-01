import { Request, Response } from "express";
import CustomerModel from "../../customer/models/CustomerModel";
import AddressItemModel from "../../customer/models/AdressItem";
import OrderModel from "../models/OrderModel";
import { IAddressItem, ICustomer } from "../../customer/types/CustomerTypes";
import ProductModel from "../../products/models/ProductModel";
import { generateUniqueGuideNumber } from "../guide/controller/guide";
import { IProductItem } from "../../products/types/ProductTypes";
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../../../config/cloudinaryConfig";
import { saveImageToCloudinary } from "../../utils/saveImageToCloudinary";

export const CreateOrderController = async (req: Request, res: Response) => {
  try {
    // Desestructuracion de orden
    let { orderData } = req.body;
    let orderDecoded = JSON.parse(orderData);
    let { factura } = orderDecoded;
    let { cliente, pedido, envio, pago, costos } = factura || {};

    if (!factura) {
      return res.status(400).json({
        error: "El formato de factura tiene error o no existe",
      });
    }

    // Desestructuración de cliente

    let { nombres } = cliente || {};

    // Comprobacion de nulidad de cliente
    // Validacion del cliente
    if (!cliente && !nombres && !cliente.celular && !cliente.cedula) {
      return res.status(400).json({
        error: "Faltan datos del cliente o están incompletos",
      });
    }

    if (
      !envio.datos.direccion &&
      !envio.datos.barrio &&
      !envio.datos.ciudad &&
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
        created_at: new Date(Date.now()),
      };
      newCustomer = await CustomerModel.create(newCustomerData);
      createOrder.cliente = newCustomer._id;
      createOrder.envio.datos = newAddressItem;
    }

    if (envio.datos) {
      createOrder.envio.info = envio.info;
      createOrder.envio.fechaEntrega = envio.fechaEntrega;
    }

    // Costos
    createOrder.costos = costos;

    // Pago
    createOrder.pago.tipo = pago.tipo;

    // Comprobante
    let imageFile = req.file;

    if (imageFile && pago.tipo === "Anticipado") {
      let idInvoice = createOrder._id.toString();
      let exportInvoice = await saveImageToCloudinary(
        imageFile,
        "pos/order/invoice/",
        idInvoice
      );
      createOrder.pago.comprobante.url = exportInvoice.url;
      createOrder.pago.comprobante.asset_id = exportInvoice.asset_id;
    } else {
      createOrder.pago.comprobante.url = null;
      createOrder.pago.comprobante.asset_id = null;
    }

    // Timestamp
    createOrder.created_at = new Date(Date.now());

    // Productos
    let productos = pedido.productos;
    let arr = [];
    for (let itemProducto of productos) {
      let idProducto = itemProducto.product._id;
      let productExist = await ProductModel.findById(idProducto);
      if (productExist) {
        let subtotal = productExist.price * itemProducto.cantidad;
        let productoItem = {
          producto: productExist._id,
          cantidad: itemProducto.cantidad,
          total: subtotal,
          created_at: new Date(Date.now()),
        };
        arr.push(productoItem);
      }
    }

    // Ingresar productos al envio
    createOrder.pedido.productos = arr;

    let orderGuide = await generateUniqueGuideNumber();
    createOrder.envio.guia = orderGuide;
    // Cobros
    let getTotalPriceOrder = (productos: IProductItem[], envio: number) => {
      let total = 0;
      let subtotal = 0;
      let cantProductos = 0;

      // Suma de los totales de los productos
      const totalProductos: any = productos.reduce((acc, producto) => {
        if (producto.total !== undefined) {
          return acc + producto.total;
        }
        return acc;
      }, 0);

      // Suma de los totales de los productos
      const cantidadProductos: any = productos.reduce((acc, producto) => {
        if (producto.total !== undefined) {
          return acc + producto.cantidad;
        }
        return acc;
      }, 0);

      let iva = totalProductos * 0.19;
      total = totalProductos + envio;
      subtotal = totalProductos;
      cantProductos = cantidadProductos;

      return { subtotal, iva, total, cantProductos };
    };

    let { subtotal, iva, total, cantProductos } = getTotalPriceOrder(
      createOrder?.pedido?.productos,
      createOrder?.costos?.envio || 0
    );

    createOrder.cobros.cantProductos = cantProductos;
    createOrder.cobros.subtotal = subtotal;
    createOrder.cobros.IVA = iva;
    createOrder.cobros.total = total;

    await createOrder.save();

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
