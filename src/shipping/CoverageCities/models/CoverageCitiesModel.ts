import mongoose, { Schema } from "mongoose";
import { IShippingAddress } from "../types/CoverageCitiesTypes";

// Esquema del modelo
const CoverageCitiesSchema = new Schema({
  departamento: { type: String, required: true },
  ciudad: { type: String, required: true },
  envio: { type: Number, required: true },
  tipo: { type: String, required: true },
});

// Definición del modelo
const CoverageCitiesModel = mongoose.model<IShippingAddress>(
  "CoverageCities",
  CoverageCitiesSchema
);

export default CoverageCitiesModel;
