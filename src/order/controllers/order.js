import Order from "../models/order.js";
import mongoose from "mongoose";
import { calculateTaxes } from "../utils/Taxes.js";
import Product from "../../products/models/product.js";
import ProductItem from "../../products/models/productItem.js";
import { generateUniqueGuideNumber } from "../guide/controller/guide.js";
import Guide from "../guide/models/guide.js";
import formatDate from "../../utils/formatDate.js";
import { Decimal128 } from "mongoose";
import ExcelJS from "exceljs";
import Customer from "../../customer/models/customer.js";

const ObjectId = mongoose.Types.ObjectId;

const OrderController = {};

OrderController.create = async (req, res) => {
  console.log(`POST api/order/create/ (${formatDate()})`);

  try {
    let {
      barrio,
      horario,
      productos,
      envio,
      fechaEntrega,
      infoAdic,
      pago,
      origen,
      estado,
      idCliente,
      ciudad,
      departamento,
      direccion,
      localidad,
    } = req.body;

    // Calculo de productos
    let generateItem = async (products) => {
      const productList = [];
      for (let i = 0; i < products.length; i++) {
        const element = products[i];
        let product = await Product.findOne({ _id: element.product });
        let productItem = {
          product: product._id,
          cant: element.cant,
          subtotal: product.price * element.cant,
          total: product.price * element.cant,
        };
        let newProductItem = new ProductItem(productItem);
        newProductItem.save();
        productList.push(newProductItem);
      }
      return {
        productList,
      };
    };

    let productItems = await generateItem(productos);

    productItems = productItems.productList;

    let { subtotal, total } = await calculateTaxes(productItems, envio);
    let guideNumber = await generateUniqueGuideNumber();

    //Creacion del order
    const nuevoPedido = new Order({
      guia: guideNumber,
      barrio,
      horario,
      productItems,
      envio,
      total,
      fechaEntrega,
      infoAdic,
      pago,
      origen,
      estado,
      idCliente: new ObjectId(idCliente),
      subtotal,
      ciudad,
      departamento,
      direccion,
      localidad,
    });

    await nuevoPedido.save();

    res.status(201).json({ mensaje: "order creado con éxito" });
  } catch (error) {
    console.error("Error al crear el order:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

OrderController.getList = async (req, res) => {
  console.log(`GET api/order/get-list/${req.params.date} (${formatDate()})`);
  let { date } = req.params;

  try {
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
  }
};

OrderController.delete = async (req, res) => {
  console.log(`POST api/order/delete/ ${formatDate()}`);
  let data = req.body;
  try {
    for (const idPedido of data) {
      // Encuentra el order por su _id
      const order = await Order.findById(idPedido);

      if (!order) {
        console.log(`order con _id ${idPedido} no encontrado.`);
        continue;
      }

      // Elimina los elementos de productItems (si es necesario)
      for (const productItem of order.productItems) {
        await ProductItem.findByIdAndRemove(productItem);
      }
      // Elimina rl numero de guia
      let orderGuide = order.guia;
      await Guide.findOneAndRemove({ number: orderGuide });

      // Elimina el order principal
      await Order.findByIdAndRemove(idPedido);
      console.log(`Orden con _id ${idPedido} eliminado correctamente.`);
    }
    res.status(200).json({ msg: "Pedidos eliminados correctamente" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

OrderController.detail = async (req, res) => {
  try {
    let query = req.params;
    let { id } = query;
    let orderDetail = await Order.findById(id);
    let productDetails = [];
    let product = {};
    for (let i = 0; i < orderDetail.productItems.length; i++) {
      const element = orderDetail.productItems[i];
      let item = await ProductItem.findById(element);
      let productDetail = await Product.findById(item.product);

      product.name = productDetail.name;
      product.price = productDetail.price;
      product.cant = item.cant;
      product.subtotal = parseFloat(item.subtotal.toString());
      product.total = parseFloat(item.total.toString());
      console.log(product);
      productDetails.push(product);
      product = {};
    }
    let order = {
      _id: orderDetail._id,
      guia: orderDetail.guia,
      fecha: orderDetail.fechaEntrega,
      productos: productDetails,
      origen: orderDetail.origen,
      envio: orderDetail.envio,
      subtotal: parseFloat(orderDetail.subtotal.toString()),
      total: parseFloat(orderDetail.total.toString()),
    };
    res.status(200).json({
      ok: true,
      msg: "Detalle de producto obtenido con éxito",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

OrderController.report = async (req, res) => {
  try {
    let data = req.body;
    let orderData = {};
    let orderList = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let order = await Order.findById(element);
      let customer = await Customer.findById(order.idCliente);
      orderData.fecha = order.fechaEntrega;
      orderData.guia = order.guia;
      orderData.nombres = customer.nombres;
      orderData.cedula = customer.cedula;
      orderData.celular = customer.celular;
      orderData.departamento = order.departamento;
      orderData.ciudad = order.ciudad;
      orderData.localidad = order.localidad;
      orderData.barrio = order.barrio;
      orderData.direccion = order.direccion;
      orderData.subtotal = parseFloat(order.subtotal.toString());
      orderData.envio = order.envio;
      orderData.total = parseFloat(order.total.toString());
      orderData.pago = order.pago;
      orderData.infoAdic = order.infoAdic;
      orderData.horario = order.horario;
      orderList.push(orderData);
      orderData = {};
    }
    const workbook = new ExcelJS.Workbook();
    let templatePath = "src/utils/excel/Plantilla.xlsx";

    await workbook.xlsx.readFile(templatePath);
    console.log(workbook._worksheets);
    // const worksheet = workbook.getWorksheet("AGENDA");
    // console.log(workbook.getWorksheet('AGENDA'));


    // const columnHeaders = Object.keys(orderList[0]);

    // worksheet.columns = columnHeaders.map((header) => ({
    //   header,
    //   key: header,
    // }));

    // orderList.forEach((item) => {
    //   worksheet.addRow(item);
    // });


    // workbook.xlsx
    //   .writeBuffer()
    //   .then((buffer) => {
    //     // Establece las cabeceras de respuesta
    //     res.setHeader(
    //       "Content-Type",
    //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //     );
    //     res.setHeader(
    //       "Content-Disposition",
    //       "attachment; filename=reporte_pedidos.xlsx"
    //     );

    //     // Envía el archivo Excel al cliente
    //     // console.log(buffer);

    //     res.send(buffer);
    // })
    // .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export default OrderController;
