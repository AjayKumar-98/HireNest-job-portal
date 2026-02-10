import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';
import { signToken } from "../utils/jwt";


export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        throw new AppError('Please provide all required fields', 400);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        throw new AppError('Email already registered', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
    });

    const token = signToken({
        id: user._id.toString(),
        role: user.role,
    });

    const userObj = user.toObject();
    const { password: _, ...userResponse } = userObj;

    res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'User registered successfully',
        data: {
            user: userResponse,
            token,
        },
    });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError('Please provide email and password', 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }

    const token = signToken({
        id: user._id.toString(),
        role: user.role,
    });


    const userObj = user.toObject();
    const { password: _, ...userResponse } = userObj;

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Login successful',
        data: {
            user: userResponse,
            token,
        },
    });
});

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Logged out successfully',
    });
});

export default {
    signup,
    login,
    logout,
};
