export const calculateTaxes = async (data, envio) => {
  let subtotal = 0;
  let iva = 0;
  let base = 0;
  let total = 0;
  let products = await data;

  // Calculamos los impuestos para cada producto y acumulamos los valores
  for (const product of products) {
    // Convierte los valores de cadena a números si es necesario
    const subtotalProducto = parseFloat(product.subtotal);
    const ivaProducto = parseFloat(product.iva);
    const totalProducto = parseFloat(product.total);
    const baseProducto = parseFloat(product.base);

    // Acumula los valores en las variables de acumulación
    subtotal += subtotalProducto;
    iva += ivaProducto;
    base += baseProducto;
  }
  total = subtotal + envio;

  return {
    subtotal: subtotal,
    ivaTotal: iva,
    base: base,
    total: total,
  };
};
