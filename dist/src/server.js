"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const app_1 = __importDefault(require("./app"));
// Import de variables de entorno
dotenv.config();
const PORT = parseInt(process.env.PORT || "5001");
const MODE = process.env.MODE;
// Manejar errores de servidor
app_1.default.on("error", (error) => {
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
app_1.default.listen(PORT, () => {
    console.log(`Simora app running at port ${PORT}`);
});
// Conexión a base de datos
if (MODE === "deploy" || MODE === "development") {
    (0, dbConfig_1.default)(MODE);
}
else {
    console.error("Modo de conexión no válido");
}
