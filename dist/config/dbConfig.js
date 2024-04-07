"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const createRootUser_1 = require("../src/utils/createRootUser");
// Cargar las variables de entorno desde el archivo .ENV
(_a = (0, dotenv_1.config)()) === null || _a === void 0 ? void 0 : _a.parsed;
let ENV = process.env;
// Datos de conexión para entorno de desarrollo
const connectionDataDEV = {
    host: ENV === null || ENV === void 0 ? void 0 : ENV.DB_URL_DEV,
    port: ENV === null || ENV === void 0 ? void 0 : ENV.DB_PORT_DEV,
    database: ENV === null || ENV === void 0 ? void 0 : ENV.DB_DATABASE_DEV,
};
// Datos de conexión para entorno de desarrollo
const connectionDataDPY = {
    url: ENV === null || ENV === void 0 ? void 0 : ENV.DB_URL_DPY,
    username: ENV === null || ENV === void 0 ? void 0 : ENV.DB_USERNAME_DPY,
    password: ENV === null || ENV === void 0 ? void 0 : ENV.DB_PASSWORD_DPY,
    cluster: ENV === null || ENV === void 0 ? void 0 : ENV.DB_CLUSTER_DPY,
    database: ENV === null || ENV === void 0 ? void 0 : ENV.DB_DATABASE_DPY,
};
// Función para establecer la conexión a la base de datos
function getConnection(mode) {
    return __awaiter(this, void 0, void 0, function* () {
        let connectionString;
        // Seleccionar los datos de conexión según el modo especificado
        if (mode === "deploy") {
            connectionString = `${connectionDataDPY.url}${connectionDataDPY.username}:${connectionDataDPY.password}${connectionDataDPY.cluster}/${connectionDataDPY.database}`;
        }
        else if (mode === "development") {
            connectionString = `${connectionDataDEV.host}:${connectionDataDEV.port}/${connectionDataDEV.database}`;
        }
        // Si el modo de conexión no es válido, mostrar un mensaje de error y salir
        if (!connectionString) {
            console.log("Modo de conexión no válido");
            return false;
        }
        try {
            // Intentar conectar a la base de datos utilizando Mongoose
            yield mongoose_1.default.connect(connectionString, {});
            console.log(`MongoDB established for ${mode} mode`);
            (0, createRootUser_1.createRootUser)();
            return true;
        }
        catch (err) {
            console.error(`Connection error at database: ${err}`);
            return false;
        }
    });
}
exports.default = getConnection;
