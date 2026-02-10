import { Request, Response, NextFunction } from 'express';

/**
 * AsyncHandler wrapper for async Express route handlers.
 * Automatically catches Promise rejections and passes to error middleware.
 */
export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default asyncHandler;
