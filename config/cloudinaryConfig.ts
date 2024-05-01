// Importar el módulo 'v2' de Cloudinary con el alias 'cloudinary'
import { v2 as cloudinary } from "cloudinary";
import { DotenvParseOutput, config } from "dotenv";

// Obtener la configuración de las variables de entorno utilizando 'config' de 'dotenv'
config()?.parsed;

// Carga de variables de entorno
let { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

// Función para configurar Cloudinary
const cloudinaryConfig = () => {
  // Verificar si las variables de entorno están definidas

  // Configurar Cloudinary con las credenciales obtenidas de las variables de entorno
  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET,
  });
  return cloudinary;
};

// Exportar la función de configuración de Cloudinary
export { cloudinaryConfig };
