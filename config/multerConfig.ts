import multer from "multer";

// Configura multer para guardar los archivos en una carpeta específica
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Crea el middleware para manejar la carga de archivos
const upload = multer({ storage: storage });

export default upload;
