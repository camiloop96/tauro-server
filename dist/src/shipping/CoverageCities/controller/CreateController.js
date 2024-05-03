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
exports.CreateCoverageCityController = void 0;
const CoverageCitiesModel_1 = __importDefault(require("../models/CoverageCitiesModel"));
const CreateCoverageCityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Payload
    let payload = req.body || {};
    let { departamento, ciudad, envio, tipo } = payload || {};
    // Comprobaciones
    if (!departamento && !ciudad && !envio && !tipo) {
        return res.status(400).json({
            error: "Faltan campos obligatorios",
        });
    }
    if (tipo !== "local" && tipo !== "nacional") {
        return res.status(400).json({
            error: "El tipo debe ser local o nacional",
        });
    }
    let departamentoPayload = departamento;
    let ciudadPayload = ciudad;
    try {
        let isExistDepartamento = yield CoverageCitiesModel_1.default.findOne({
            departamento: departamentoPayload,
        });
        let createCoverageCity = new CoverageCitiesModel_1.default();
        if (!isExistDepartamento && departamentoPayload !== undefined) {
            createCoverageCity.departamento = departamentoPayload;
        }
        else {
            createCoverageCity.departamento = isExistDepartamento === null || isExistDepartamento === void 0 ? void 0 : isExistDepartamento.departamento;
        }
        let isExistCiudad = yield CoverageCitiesModel_1.default.findOne({
            ciudad: ciudadPayload,
        });
        if (!isExistCiudad && ciudadPayload !== undefined) {
            createCoverageCity.ciudad = ciudadPayload;
        }
        else {
            return res.status(400).json({
                error: "Ciudad de cobertura ya existe",
            });
        }
        createCoverageCity.tipo = tipo;
        createCoverageCity.envio = envio;
        createCoverageCity.save();
        return res.status(200).json({
            message: "Ciudad de cobertura creada con éxito",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Error interno en el servidor",
        });
    }
});
exports.CreateCoverageCityController = CreateCoverageCityController;
