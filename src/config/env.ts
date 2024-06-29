// Imports
import { config } from "dotenv";

// Definir una interfaz para la estructura de datos de conexión
interface ConnectionDataDevelopmentTypes {
  host: string | undefined;
  port: string | undefined;
  database: string | undefined;
}

interface ConnectionDataDeploymentTypes {
  url: string | undefined;
  username: string | undefined;
  password: string | undefined;
  cluster: string | undefined;
  database: string | undefined;
}

// Cargar las variables de entorno desde el archivo .ENV
config()?.parsed;
let ENV = process.env;

// Datos de conexión para entorno de desarrollo
export const connectionDataDEV: ConnectionDataDevelopmentTypes = {
  host: ENV?.DB_URL_DEV,
  port: ENV?.DB_PORT_DEV,
  database: ENV?.DB_DATABASE_DEV,
};

// Datos de conexión para entorno de desarrollo
export const connectionDataDPY: ConnectionDataDeploymentTypes = {
  url: ENV?.DB_URL_DPY,
  username: ENV?.DB_USERNAME_DPY,
  password: ENV?.DB_PASSWORD_DPY,
  cluster: ENV?.DB_CLUSTER_DPY,
  database: ENV?.DB_DATABASE_DPY,
};

// PORT app and Node env configurations
export const PORT = ENV.PORT;
export const NODE_ENV = ENV.MODE || "development";
