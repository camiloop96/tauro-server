"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Esquema de usuario
const userSchema = new mongoose_1.Schema({
    employee: {
        type: mongoose_1.Schema.ObjectId,
        required: true,
        ref: "Employee",
    },
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Role",
    },
    credential: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Credential",
    },
});
// Creación del modelo
exports.default = (0, mongoose_1.model)("User", userSchema);
