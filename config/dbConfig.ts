import { config } from "dotenv";
import mongoose from "mongoose";
import { createRootUser } from "../src/utils/createRootUser";

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
const connectionDataDEV: ConnectionDataDevelopmentTypes = {
  host: ENV?.DB_URL_DEV,
  port: ENV?.DB_PORT_DEV,
  database: ENV?.DB_DATABASE_DEV,
};

// Datos de conexión para entorno de desarrollo
const connectionDataDPY: ConnectionDataDeploymentTypes = {
  url: ENV?.DB_URL_DPY,
  username: ENV?.DB_USERNAME_DPY,
  password: ENV?.DB_PASSWORD_DPY,
  cluster: ENV?.DB_CLUSTER_DPY,
  database: ENV?.DB_DATABASE_DPY,
};

// Función para establecer la conexión a la base de datos
export default async function getConnection(
  mode: "deploy" | "development"
): Promise<boolean> {
  let connectionString: string | undefined;

  // Seleccionar los datos de conexión según el modo especificado
  if (mode === "deploy") {
    connectionString = `${connectionDataDPY.url}${connectionDataDPY.username}:${connectionDataDPY.password}${connectionDataDPY.cluster}/${connectionDataDPY.database}`;
  } else if (mode === "development") {
    connectionString = `${connectionDataDEV.host}:${connectionDataDEV.port}/${connectionDataDEV.database}`;
  }

  // Si el modo de conexión no es válido, mostrar un mensaje de error y salir
  if (!connectionString) {
    console.log("Modo de conexión no válido");
    return false;
  }

  try {
    // Intentar conectar a la base de datos utilizando Mongoose
    await mongoose.connect(connectionString, {});
    console.log(`MongoDB established for ${mode} mode`);
    createRootUser();
    return true;
  } catch (err) {
    console.error(`Connection error at database: ${err}`);
    return false;
  }
}
