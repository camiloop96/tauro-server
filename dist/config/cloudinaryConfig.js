"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConfig = void 0;
// Importar el módulo 'v2' de Cloudinary con el alias 'cloudinary'
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
// Obtener la configuración de las variables de entorno utilizando 'config' de 'dotenv'
(_a = (0, dotenv_1.config)()) === null || _a === void 0 ? void 0 : _a.parsed;
// Carga de variables de entorno
let { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
// Función para configurar Cloudinary
const cloudinaryConfig = () => {
    // Verificar si las variables de entorno están definidas
    // Configurar Cloudinary con las credenciales obtenidas de las variables de entorno
    cloudinary_1.v2.config({
        cloud_name: CLOUDINARY_NAME,
        api_key: CLOUDINARY_KEY,
        api_secret: CLOUDINARY_SECRET,
    });
    return cloudinary_1.v2;
};
exports.cloudinaryConfig = cloudinaryConfig;
