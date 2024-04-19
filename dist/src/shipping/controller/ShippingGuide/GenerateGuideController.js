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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateGuideController = void 0;
const fs_1 = __importDefault(require("fs"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const svg_to_pdfkit_1 = __importDefault(require("svg-to-pdfkit"));
const mustache_1 = __importDefault(require("mustache"));
const GenerateGuideController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).send("No se ha proporcionado ningún archivo");
        }
        /* // Obtener la ruta del archivo temporal
        const filePath = req.file.path;
    
        // Leer el archivo Excel
        const workbook = XLSX.readFile(filePath);
    
        // Leer el contenido del archivo Excel
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let jsonData = XLSX.utils.sheet_to_json(worksheet);
    
        console.log(jsonData); */
        let jsonData = [
            {
                id: "661f09276e62a0bafd092112",
                guia: "MAG22969",
                fechaEntrega: "17-04-2024",
                nombres: "Sandra Guerrero",
                celular: 3044983769,
                departamento: "Bogotá",
                ciudad: "Bogotá",
                localidad: "Ciudad Bolívar",
                barrio: "Perdomo",
                direccion: "Carrera 73 # 57r - 15 sur",
                subtotal: 31000,
                envio: 0,
                total: 31000,
                infoAdic: "T. 14 - 501 / Conjunto bosques del portal",
                pago: "Contraentrega",
                horario: "DESPUÉS DE 1PM",
            },
            {
                id: "661f23096e62a0bafd092182",
                guia: "MAG22970",
                fechaEntrega: "17-04-2024",
                nombres: "Flor López",
                celular: 3214882897,
                departamento: "Bogotá",
                ciudad: "Bogotá",
                localidad: "Engativá",
                barrio: "Las Ferias",
                direccion: "Calle 77 # 69 - 74",
                subtotal: 49000,
                envio: 0,
                total: 49000,
                infoAdic: "n/a",
                pago: "Contraentrega",
                horario: "n/a",
            },
        ];
        let plantilla = "src/shipping/templates/template.svg";
        fs_1.default.readFile(plantilla, "utf-8", (err, data) => {
            if (err) {
                console.error("Error al leer el archivo SVG:", err);
                return;
            }
            // Ajustar tamaño de pdf
            //**Milimetros */
            const widthInMM = 101;
            const heightInMM = 80;
            //**Milimetros */
            const widthInPoints = (widthInMM * 72) / 25.4;
            const heightInPoints = (heightInMM * 72) / 25.4;
            // Crear un nuevo documento PDF
            const doc = new pdfkit_1.default({
                size: [widthInPoints, heightInPoints],
            });
            const outputStream = fs_1.default.createWriteStream("pedidos.pdf");
            // Pipe the PDF output to a file
            doc.pipe(outputStream);
            // Iterar sobre cada objeto de pedido
            jsonData.forEach((pedido, index) => {
                // Rellenar la plantilla SVG con los datos del pedido
                const svg = mustache_1.default.render(data, pedido);
                // Convertir el SVG a PDF y agregarlo a la página
                (0, svg_to_pdfkit_1.default)(doc, svg, 0, 0);
                // Si no es el último pedido, agregar un salto de página
                if (index < jsonData.length - 1) {
                    doc.addPage();
                }
            });
            // Finalizar el documento PDF
            doc.end();
            console.log("PDF generado: pedidos.pdf");
        });
        // Hacer algo con los datos leídos, como enviarlos como respuesta
    }
    catch (error) {
        console.log(error);
        console.error("Error al leer el archivo Excel:", error);
        res.status(500).send("Error al leer el archivo Excel");
    }
});
exports.GenerateGuideController = GenerateGuideController;
