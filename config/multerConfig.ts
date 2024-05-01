import multer from "multer";

// Configuración de multer para manejar form-data
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    fieldSize: 2 * 1024 * 1024,
  },
});
export default upload;
