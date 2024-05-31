import { Types } from "mongoose";
import { BranchStore } from "../entities/BranchStore";

export interface IBranchStore extends Document {
  name: string;
  state: string;
  city: string;
  _id?: string;
}

export interface IBranchStoreRepository {
  createBranchStore(branchStore: BranchStore): Promise<void>;
  checkIfBranchStoreExist(branchStoreID: Types.ObjectId): Promise<boolean>;
  checkIfBranchStoreExistByCity(name: string): Promise<boolean>;
  checkAndParseID(id: string): Promise<Types.ObjectId>;
  getBranchList(): Promise<BranchStore[]>;
  updateBranchStore(
    branchStoreID: Types.ObjectId,
    payload: BranchStore
  ): Promise<void>;
  deleteBranchStore(branchStoreID: Types.ObjectId): Promise<void>;
  detailBranchStore(branchStoreID: Types.ObjectId): Promise<BranchStore | null>;
}
