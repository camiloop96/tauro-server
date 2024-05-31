"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchStoreModel = void 0;
const mongoose_1 = require("mongoose");
const branchSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    state: { type: String, required: false },
    city: { type: String, required: false },
});
const BranchStoreModel = (0, mongoose_1.model)("BranchStore", branchSchema);
exports.BranchStoreModel = BranchStoreModel;
