"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Configura multer para guardar los archivos en una carpeta específica
const storage = multer_1.default.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
// Crea el middleware para manejar la carga de archivos
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
