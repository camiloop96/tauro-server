"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.PORT = exports.connectionDataDPY = exports.connectionDataDEV = void 0;
// Imports
const dotenv_1 = require("dotenv");
// Cargar las variables de entorno desde el archivo .ENV
(_a = (0, dotenv_1.config)()) === null || _a === void 0 ? void 0 : _a.parsed;
let ENV = process.env;
// Datos de conexión para entorno de desarrollo
exports.connectionDataDEV = {
    host: ENV === null || ENV === void 0 ? void 0 : ENV.DB_URL_DEV,
    port: ENV === null || ENV === void 0 ? void 0 : ENV.DB_PORT_DEV,
    database: ENV === null || ENV === void 0 ? void 0 : ENV.DB_DATABASE_DEV,
};
// Datos de conexión para entorno de desarrollo
exports.connectionDataDPY = {
    url: ENV === null || ENV === void 0 ? void 0 : ENV.DB_URL_DPY,
    username: ENV === null || ENV === void 0 ? void 0 : ENV.DB_USERNAME_DPY,
    password: ENV === null || ENV === void 0 ? void 0 : ENV.DB_PASSWORD_DPY,
    cluster: ENV === null || ENV === void 0 ? void 0 : ENV.DB_CLUSTER_DPY,
    database: ENV === null || ENV === void 0 ? void 0 : ENV.DB_DATABASE_DPY,
};
// PORT app and Node env configurations
exports.PORT = ENV.PORT;
exports.NODE_ENV = ENV.MODE || "development";
