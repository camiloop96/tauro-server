import { getCurrentDate } from "@utils/dateManager";

/**
 * Log an error message with the current date.
 * @param {string} message - The error message to log.
 * @param {string} [context] - Additional context for the error.
 */
export const logError = (message: string, context?: string) => {
  const fullMessage = `${getCurrentDate()} Error: ${message}`;
  if (context) {
    console.error(`${fullMessage} | Context: ${context}`);
  } else {
    console.error(fullMessage);
  }
};

/**
 * Log a success message with the current date.
 * @param {string} message - The success message to log.
 * @param {string} [context] - Additional context for the message.
 */
export const logSuccess = (message: string, context?: string) => {
  const fullMessage = `${getCurrentDate()} Success: ${message}`;
  if (context) {
    console.log(`${fullMessage} | Context: ${context}`);
  } else {
    console.log(fullMessage);
  }
};
