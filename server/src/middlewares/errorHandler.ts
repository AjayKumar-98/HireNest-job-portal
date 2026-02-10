import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils';

/**
 * Global error handling middleware
 * Should be the last middleware in the app
 */
export const errorHandler = (
    error: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const isDevelopment = process.env.NODE_ENV === 'development';

    let statusCode = 500;
    let message = 'Internal Server Error';

    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
    } else if (error instanceof Error) {
        message = error.message;
    }

    // Log error
    console.error(`[ERROR] ${statusCode} - ${message}`);
    if (isDevelopment && error instanceof Error) {
        console.error(error.stack);
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        ...(isDevelopment && { stack: error instanceof Error ? error.stack : undefined }),
    });
};

export default errorHandler;
