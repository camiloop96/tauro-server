"use strict";
/**
 * @file MongoSellerRepository.ts
 * @description Implements the ISellerRepository interface for interacting with Seller data in MongoDB.
 */
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
exports.MongoSellerRepository = void 0;
const AppError_1 = require("../../../../shared/errors/AppError");
const mongoose_1 = require("mongoose");
const SellerModel_1 = require("../models/SellerModel");
/**
 * Class representing a repository for managing Seller entities in MongoDB.
 * @implements {ISellerRepository}
 */
class MongoSellerRepository {
    /**
     * Fetches a seller by their employee ID.
     * @param employeeID - The ObjectId of the employee.
     * @returns A promise that resolves to a Seller entity or null if not found.
     * @throws {AppError} Throws an error if the employee ID is invalid or if fetching fails.
     */
    getSellerByEmployeeID(employeeID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!employeeID || !(0, mongoose_1.isValidObjectId)(employeeID)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                const findSeller = yield SellerModel_1.SellerModel.findOne({
                    employee: employeeID,
                });
                if (findSeller) {
                    return findSeller;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error fetching seller", 500);
                }
            }
        });
    }
    /**
     * Creates a new seller with the given employee ID.
     * @param employeeID - The ObjectId of the employee.
     * @returns A promise that resolves when the seller is created.
     * @throws {AppError} Throws an error if the employee ID is invalid or if creating fails.
     */
    createSeller(employeeID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!employeeID || !(0, mongoose_1.isValidObjectId)(employeeID)) {
                    throw new AppError_1.AppError("Missing or invalid ID", 400);
                }
                const createSeller = new SellerModel_1.SellerModel({
                    employee: employeeID,
                });
                yield createSeller.save();
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError("Error creating seller", 500);
                }
            }
        });
    }
}
exports.MongoSellerRepository = MongoSellerRepository;
