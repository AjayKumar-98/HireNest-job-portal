/**
 * Custom AppError class for handling application errors
 */
export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Utility function to throw an AppError
 */
export const throwError = (message: string, statusCode: number = 500): never => {
    throw new AppError(message, statusCode);
};

export default AppError;
