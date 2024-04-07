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
exports.generateUniqueGuideNumber = void 0;
const GuideModel_1 = __importDefault(require("../models/GuideModel"));
// Función para generar un número de guía único y consecutivo
const generateUniqueGuideNumber = () => __awaiter(void 0, void 0, void 0, function* () {
    // Generar desde
    let lastGuideNumberInDatabase = 11282;
    // Consulta el último número de guía almacenado en la base de datos
    const lastGuide = yield GuideModel_1.default.findOne({}, {}, { sort: { number: -1 } });
    if (lastGuide) {
        lastGuideNumberInDatabase = parseInt(lastGuide.number.replace("MAG", ""), 10);
    }
    // Encuentra un número de guía único
    let newGuideNumber;
    do {
        lastGuideNumberInDatabase++;
        newGuideNumber = `MAG${lastGuideNumberInDatabase
            .toString()
            .padStart(5, "0")}`;
    } while (yield GuideModel_1.default.findOne({ number: newGuideNumber }));
    // Crea el nuevo número de guía en la base de datos
    const newGuide = new GuideModel_1.default({ number: newGuideNumber });
    yield newGuide.save();
    return newGuideNumber;
});
exports.generateUniqueGuideNumber = generateUniqueGuideNumber;
