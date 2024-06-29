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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoBranchStoreRepository = void 0;
const AppError_1 = require("../../../../shared/errors/AppError");
const BranchStore_1 = require("../models/BranchStore");
const mongoose_1 = require("mongoose");
class MongoBranchStoreRepository {
    createRootBranchStore(branchStore) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, state, city } = branchStore || {};
                if (!name) {
                    throw new AppError_1.AppError("Name field is missing", 400);
                }
                if (!state) {
                    throw new AppError_1.AppError("State field is missing", 400);
                }
                if (!city) {
                    throw new AppError_1.AppError("City field is missing", 400);
                }
                const newBranchStore = new BranchStore_1.BranchStoreModel({
                    name: name,
                    state: state,
                    city: city,
                });
                const saveBranchStore = yield newBranchStore.save();
                const parseID = new mongoose_1.Types.ObjectId(saveBranchStore._id);
                return parseID;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error creating branch store", 500);
                }
            }
        });
    }
    updateBranchStore(branchStoreID, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!branchStoreID || !(0, mongoose_1.isValidObjectId)(branchStoreID)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                if (Object.keys(payload).length === 0) {
                    throw new AppError_1.AppError("Branch Store data cannot be empty", 400);
                }
                const updateBranchStore = yield BranchStore_1.BranchStoreModel.findByIdAndUpdate(branchStoreID, { $set: payload }, { new: true, runValidators: true });
                if (!updateBranchStore) {
                    throw new AppError_1.AppError("Branch Store not found", 404);
                }
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error updating Branch Store", 500);
                }
            }
        });
    }
    deleteBranchStore(branchStoreID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!branchStoreID || !(0, mongoose_1.isValidObjectId)(branchStoreID)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                yield BranchStore_1.BranchStoreModel.findByIdAndDelete(branchStoreID);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error deleting Branch Store", 500);
                }
            }
        });
    }
    detailBranchStore(branchStoreID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!branchStoreID || !(0, mongoose_1.isValidObjectId)(branchStoreID)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                const getDetail = yield BranchStore_1.BranchStoreModel.findById(branchStoreID);
                return getDetail;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching Branch Store", 500);
                }
            }
        });
    }
    getBranchList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const branchStoreList = yield BranchStore_1.BranchStoreModel.find()
                    .select("-__v -state -city")
                    .exec();
                return branchStoreList;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching Branch Stores", 500);
                }
            }
        });
    }
    checkIfBranchStoreExistByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name || name.length === 0) {
                    throw new AppError_1.AppError("Missing or invalid branch store name", 400);
                }
                const existBranchStore = yield BranchStore_1.BranchStoreModel.findOne({
                    name: name,
                });
                if (existBranchStore) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching Branc Store", 500);
                }
            }
        });
    }
    // Parse id
    checkAndParseID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !(0, mongoose_1.isValidObjectId)(id)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                let parseID = new mongoose_1.Types.ObjectId(id);
                return parseID;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error parsing ID", 500);
                }
            }
        });
    }
    // Check if branc store exist
    checkIfBranchStoreExist(branchStoreID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!branchStoreID || !(0, mongoose_1.isValidObjectId)(branchStoreID)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                const existBranchStore = yield BranchStore_1.BranchStoreModel.findById(branchStoreID);
                if (existBranchStore) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching branch store", 500, error);
                }
            }
        });
    }
    createBranchStore(branchStore) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, state, city } = branchStore || {};
                if (!name) {
                    throw new AppError_1.AppError("Name field is missing", 400);
                }
                if (!state) {
                    throw new AppError_1.AppError("State field is missing", 400);
                }
                if (!city) {
                    throw new AppError_1.AppError("City field is missing", 400);
                }
                const newBranchStore = new BranchStore_1.BranchStoreModel({
                    name: name,
                    state: state,
                    city: city,
                });
                yield newBranchStore.save();
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error creating branch store", 500);
                }
            }
        });
    }
}
exports.MongoBranchStoreRepository = MongoBranchStoreRepository;
