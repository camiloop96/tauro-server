// Importación de módulos
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import AppRoutes from "./routes/routes";
import { authenticateToken } from "./middlewares/authenticateToken";
import cors from "cors";
import multer from "multer";

// Creación del servidor
const app: Express = express();

// Middlewares de parseo de datos
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para el seguridad con cors
app.use(cors());
// Rutas
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Server online",
  });
});

app.use("/simora/api/", AppRoutes);

// Manejador de errores para middleware no encontrado
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint no encontrado" });
});

// Middleware de manejo de errores
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

export default app;
