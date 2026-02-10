import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
    // Server
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    // Database
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/hirenest',

    // JWT
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    jwtExpires: process.env.JWT_EXPIRES || '7d',

    // CORS
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',

    // API
    apiUrl: process.env.API_URL || 'http://localhost:5000',
};

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];

const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar] && process.env.NODE_ENV === 'production'
);

if (missingEnvVars.length > 0) {
    console.warn(
        `⚠️  Warning: Missing required environment variables in production: ${missingEnvVars.join(', ')}`
    );
}

export default config;
