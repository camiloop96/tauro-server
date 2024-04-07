import { Request, Response } from "express";

export const CreateOrderController = async (req: Request, res: Response) => {
    console.log(`${}POST api/order/create/ (${formatDate()})`);
  
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
  