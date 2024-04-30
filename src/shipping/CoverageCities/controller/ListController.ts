import { Request, Response } from "express";
import CoverageCitiesModel from "../models/CoverageCitiesModel";

export const ListCoverageCitiesController = async (
  req: Request,
  res: Response
) => {
  try {
    let coverageCitiesList = await CoverageCitiesModel.find().select(
      "_id departamento ciudad tipo"
    );
    return res.status(200).json(coverageCitiesList);
  } catch (error) {
    return res.status(400).json({
      error: "Error interno en el servidor",
    });
  }
};
