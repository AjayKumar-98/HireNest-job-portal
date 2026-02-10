import { Response } from 'express';

export interface ApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
}

/**
 * Send a standardized API response
 */
export const sendResponse = <T = any>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T
): Response<ApiResponse<T>> => {
    return res.status(statusCode).json({
        success: statusCode < 400,
        statusCode,
        message,
        ...(data && { data }),
    });
};

/**
 * Send a success response (2xx status codes)
 */
export const sendSuccess = <T = any>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200
): Response<ApiResponse<T>> => {
    return sendResponse(res, statusCode, message, data);
};

/**
 * Send an error response (4xx/5xx status codes)
 */
export const sendError = (
    res: Response,
    message: string,
    statusCode: number = 500
): Response<ApiResponse> => {
    return sendResponse(res, statusCode, message);
};

export default sendResponse;
