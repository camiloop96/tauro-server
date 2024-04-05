import express, { Express } from "express";
import * as dotenv from "dotenv";
import getConnection from "../config/dbConfig";
import app from "./app";

// Import de variables de entorno
dotenv.config();
const PORT: number = parseInt(process.env.PORT || "5001");
const MODE: string | undefined = process.env.MODE;

// Manejar errores de servidor
app.on("error", (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // Manejar diferentes tipos de errores
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Escuchar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Simora app running at port ${PORT}`);
});

// Conexión a base de datos
if (MODE === "deploy" || MODE === "development") {
  getConnection(MODE);
} else {
  console.error("Modo de conexión no válido");
}
