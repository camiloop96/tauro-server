"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Esquema de usuario
const userSchema = new mongoose_1.Schema({
    employee: { type: String, required: true },
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Role",
    },
});
// Creación del modelo
const UserModel = (0, mongoose_1.model)("User", userSchema);
// Export del componente
exports.default = UserModel;
