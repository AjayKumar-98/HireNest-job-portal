import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '../utils/jwt';
import { AppError } from '../utils';

/**
 * Extend Express Request to include user info
 */
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: 'candidate' | 'recruiter';
            };
            token?: string;
        }
    }
}

/**
 * Authentication middleware to verify JWT token
 * Attaches user info to request if token is valid
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Extract token from Authorization header
        const token = extractTokenFromHeader(req.headers.authorization);

        if (!token) {
            throw new AppError('No token provided. Please provide a valid token', 401);
        }

        // Verify token
        const decoded = verifyToken(token);

        // Attach user info to request
        req.user = {
            id: decoded.id,
            role: decoded.role as 'candidate' | 'recruiter',
        };
        req.token = token;

        next();
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        if (error instanceof Error) {
            if (error.message === 'Invalid token') {
                throw new AppError('Invalid token', 401);
            }
            if (error.message === 'Token expired') {
                throw new AppError('Token expired', 401);
            }
        }

        throw new AppError('Authentication failed', 401);
    }
};

/**
 * Authorization middleware to check user role
 * Should be used after authenticate middleware
 */
export const authorize = (...allowedRoles: Array<'candidate' | 'recruiter'>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            throw new AppError('User not authenticated', 401);
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw new AppError('You do not have permission to access this resource', 403);
        }

        next();
    };
};

export default {
    authenticate,
    authorize,
};
