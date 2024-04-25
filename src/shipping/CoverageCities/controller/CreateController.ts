import { Request, Response } from "express";
import CoverageCitiesModel from "../models/CoverageCitiesModel";

export const CreateCoverageCityController = async (
  req: Request,
  res: Response
) => {
  // Payload
  let payload = req.body || {};
  let { departamento, ciudad, envio, tipo } = payload || {};

  // Comprobaciones
  if (!departamento && !ciudad && !envio && !tipo) {
    return res.status(400).json({
      error: "Faltan campos obligatorios",
    });
  }
  if (isNaN(envio) || envio === 0) {
    return res.status(400).json({
      error: "El envío debe ser un numero y debe ser diferente de 0",
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
    let isExistDepartamento = await CoverageCitiesModel.findOne({
      departamento: departamentoPayload,
    });
    let createCoverageCity = new CoverageCitiesModel();
    if (!isExistDepartamento && departamentoPayload !== undefined) {
      createCoverageCity.departamento = departamentoPayload;
    } else {
      createCoverageCity.departamento = isExistDepartamento?.departamento;
    }
    let isExistCiudad = await CoverageCitiesModel.findOne({
      ciudad: ciudadPayload,
    });
    if (!isExistCiudad && ciudadPayload !== undefined) {
      createCoverageCity.ciudad = ciudadPayload;
    } else {
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
  } catch (error: any) {
    return res.status(500).json({
      error: "Error interno en el servidor",
    });
  }
};
