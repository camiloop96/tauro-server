/**
 * @file AppError.ts
 * @description Custom error class for application-specific errors. Extends the built-in `Error` class to include additional properties such as `statusCode` and `originalError`.
 */

/**
 * Class representing an application-specific error.
 * @extends Error
 */
export class AppError extends Error {
  /**
   * Creates an instance of `AppError`.
   *
   * @param {string} message - A descriptive error message.
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {any} [originalError] - An optional parameter to include the original error object.
   */
  constructor(
    public message: string,
    public statusCode: number,
    public originalError?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.originalError = originalError;
  }
}
