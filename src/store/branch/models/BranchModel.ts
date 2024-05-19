// src/models/Branch.ts
import { Schema, model, Document } from "mongoose";
import { IBranch } from "../types/BranchTrypes";

const branchSchema = new Schema<IBranch>({
  name: { type: String, required: true },
  state: { type: String, required: false },
  city: { type: String, required: false },
});

const BranchStoreModel = model<IBranch>("BranchStore", branchSchema);

export { BranchStoreModel };
