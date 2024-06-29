"use strict";
/**
 * @file AppError.ts
 * @description Custom error class for application-specific errors. Extends the built-in `Error` class to include additional properties such as `statusCode` and `originalError`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
/**
 * Class representing an application-specific error.
 * @extends Error
 */
class AppError extends Error {
    /**
     * Creates an instance of `AppError`.
     *
     * @param {string} message - A descriptive error message.
     * @param {number} statusCode - The HTTP status code associated with the error.
     * @param {any} [originalError] - An optional parameter to include the original error object.
     */
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
