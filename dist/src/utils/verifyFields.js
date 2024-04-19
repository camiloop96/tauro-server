"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFields = void 0;
const verifyFields = (requiredFields, request, res) => {
    const missingFields = requiredFields.filter((field) => {
        !request[field];
    });
    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Los campos ${missingFields.join(", ")} son obligatorios`,
        });
    }
};
exports.verifyFields = verifyFields;
