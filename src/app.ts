// Importación de módulos
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import App_Routes from "./routes/routes";
import appRoutes from "./routes/routes";

// Creación del servidor
const APP: Express = express();

// Middlewares de parseo de datos
APP.use(express.urlencoded({ extended: true }));
APP.use(bodyParser.json());

// Middleware para el seguridad con cors
APP.use(cors());
// Rutas
APP.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Server online",
  });
});

// Gateway
APP.use("/simora/api/", appRoutes);

// Manejador de errores para middleware no encontrado
APP.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint no encontrado" });
});

// Middleware de manejo de errores
APP.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

export default APP;
