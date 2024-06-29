"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logSuccess = exports.logError = void 0;
const dateManager_1 = require("../dateManager");
/**
 * Log an error message with the current date.
 * @param {string} message - The error message to log.
 * @param {string} [context] - Additional context for the error.
 */
const logError = (message, context) => {
    const fullMessage = `${(0, dateManager_1.getCurrentDate)()} Error: ${message}`;
    if (context) {
        console.error(`${fullMessage} | Context: ${context}`);
    }
    else {
        console.error(fullMessage);
    }
};
exports.logError = logError;
/**
 * Log a success message with the current date.
 * @param {string} message - The success message to log.
 * @param {string} [context] - Additional context for the message.
 */
const logSuccess = (message, context) => {
    const fullMessage = `${(0, dateManager_1.getCurrentDate)()} Success: ${message}`;
    if (context) {
        console.log(`${fullMessage} | Context: ${context}`);
    }
    else {
        console.log(fullMessage);
    }
};
exports.logSuccess = logSuccess;
