import { BranchStore } from "@modules/store/domain/entities/BranchStore";
import { IBranchStoreRepository } from "@modules/store/domain/repositories/IBranchStoreRepository";
import { AppError } from "@shared/errors/AppError";
import { BranchStoreModel } from "../models/BranchStore";
import { Types, isValidObjectId } from "mongoose";

export class MongoBranchStoreRepository implements IBranchStoreRepository {
  async updateBranchStore(
    branchStoreID: Types.ObjectId,
    payload: BranchStore
  ): Promise<void> {
    try {
      if (!branchStoreID || !isValidObjectId(branchStoreID)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      if (Object.keys(payload).length === 0) {
        throw new AppError("Branch Store data cannot be empty", 400);
      }
      const updateBranchStore = await BranchStoreModel.findByIdAndUpdate(
        branchStoreID,
        { $set: payload },
        { new: true, runValidators: true }
      );

      if (!updateBranchStore) {
        throw new AppError("Branch Store not found", 404);
      }
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error updating Branch Store", 500);
      }
    }
  }
  async deleteBranchStore(branchStoreID: Types.ObjectId): Promise<void> {
    try {
      if (!branchStoreID || !isValidObjectId(branchStoreID)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      await BranchStoreModel.findByIdAndDelete(branchStoreID);
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error deleting Branch Store", 500);
      }
    }
  }
  async detailBranchStore(
    branchStoreID: Types.ObjectId
  ): Promise<BranchStore | null> {
    try {
      if (!branchStoreID || !isValidObjectId(branchStoreID)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      const getDetail = await BranchStoreModel.findById(branchStoreID);
      return getDetail;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching Branch Store", 500);
      }
    }
  }
  async getBranchList(): Promise<BranchStore[]> {
    try {
      const branchStoreList = await BranchStoreModel.find()
        .select("-__v -state -city")
        .exec();
      return branchStoreList;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching Branch Stores", 500);
      }
    }
  }
  async checkIfBranchStoreExistByCity(name: string): Promise<boolean> {
    try {
      if (!name || name.length === 0) {
        throw new AppError("Missing or invalid branch store name", 400);
      }
      const existBranchStore = await BranchStoreModel.findOne({
        city: name,
      });

      if (existBranchStore) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching Branc Store", 500);
      }
    }
  }
  // Parse id
  async checkAndParseID(id: string): Promise<Types.ObjectId> {
    try {
      if (!id || !isValidObjectId(id)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      let parseID = new Types.ObjectId(id);
      return parseID;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error parsing ID", 500);
      }
    }
  }
  // Check if branc store exist
  async checkIfBranchStoreExist(
    branchStoreID: Types.ObjectId
  ): Promise<boolean> {
    try {
      if (!branchStoreID || !isValidObjectId(branchStoreID)) {
        throw new AppError("Missing or invalid ID", 400);
      }
      const existBranchStore = await BranchStoreModel.findById(branchStoreID);
      if (existBranchStore) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error fetching branch store", 500, error);
      }
    }
  }
  async createBranchStore(branchStore: BranchStore) {
    try {
      const { name, state, city } = branchStore || {};
      if (!name) {
        throw new AppError("Name field is missing", 400);
      }
      if (!state) {
        throw new AppError("State field is missing", 400);
      }
      if (!city) {
        throw new AppError("City field is missing", 400);
      }

      const newBranchStore = new BranchStoreModel({
        name: name,
        state: state,
        city: city,
      });

      await newBranchStore.save();
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError("Error creating branch store", 500);
      }
    }
  }
}
