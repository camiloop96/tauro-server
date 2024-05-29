// src/shared/errors/AppError.ts
export class AppError extends Error {
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
