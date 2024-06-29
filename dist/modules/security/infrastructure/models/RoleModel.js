"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Rople Schema
const roleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
        default: null,
    },
});
// Export Model
exports.default = (0, mongoose_1.model)("Role", roleSchema);
