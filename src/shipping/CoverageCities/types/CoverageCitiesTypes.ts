// Definir la interfaz para el documento de dirección de envío
export interface IShippingAddress extends Document {
  departamento?: string;
  ciudad?: string;
  envio?: string;
  tipo?: string;
}
