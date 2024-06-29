"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerModel = void 0;
// src/models/Branch.ts
const mongoose_1 = require("mongoose");
const sellerSchema = new mongoose_1.Schema({
    employee: { type: mongoose_1.Schema.ObjectId, required: true },
    active: { type: Boolean, default: true },
});
const SellerModel = (0, mongoose_1.model)("Seller", sellerSchema);
exports.SellerModel = SellerModel;
