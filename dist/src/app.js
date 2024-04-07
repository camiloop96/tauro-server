"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importación de módulos
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
// Creación del servidor
const app = (0, express_1.default)();
// Middlewares de parseo de datos
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Middleware para el seguridad con cors
app.use((0, cors_1.default)());
// Rutas
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Server online",
    });
});
app.use("/simora/api/", routes_1.default);
// Manejador de errores para middleware no encontrado
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint no encontrado" });
});
// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error interno del servidor" });
});
exports.default = app;
