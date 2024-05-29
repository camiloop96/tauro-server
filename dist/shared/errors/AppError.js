"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// src/shared/errors/AppError.ts
class AppError extends Error {
    constructor(message, statusCode, originalError) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.originalError = originalError;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.originalError = originalError;
    }
}
exports.AppError = AppError;
