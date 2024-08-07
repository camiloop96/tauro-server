"use strict";
/**
 * @file Seller.ts
 * @description Defines the Mongoose schema and model for the Seller entity.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerModel = void 0;
const mongoose_1 = require("mongoose");
/**
 * Mongoose schema for the Seller entity.
 */
const sellerSchema = new mongoose_1.Schema({
    employee: { type: mongoose_1.Schema.Types.ObjectId, ref: "Employee", required: true },
    active: { type: Boolean, default: true },
});
/**
 * Mongoose model for the Seller entity.
 */
const SellerModel = (0, mongoose_1.model)("Seller", sellerSchema);
exports.SellerModel = SellerModel;
