import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export interface JwtPayload {
    id: string;
    role: string;
}

export const signToken = (payload: JwtPayload): string => {
    const options: SignOptions = {
        expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds ✅
    };

    return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
export const extractTokenFromHeader = (authHeader?: string): string | null => {
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
        return null;
    }

    return parts[1];
};