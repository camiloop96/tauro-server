import { IBranchStore } from "@modules/store/domain/repositories/IBranchStoreRepository";
import { Schema, model } from "mongoose";

const branchSchema = new Schema<IBranchStore>({
  name: { type: String, required: true },
  state: { type: String, required: false },
  city: { type: String, required: false },
});

const BranchStoreModel = model<IBranchStore>("BranchStore", branchSchema);

export { BranchStoreModel };
