import mongoose from 'mongoose';
import config from './config';

let isConnected: boolean = false;

/**
 * Connect to MongoDB using Mongoose
 */
export const connectDB = async (): Promise<void> => {
    if (isConnected) {
        console.log('ℹ️  Database is already connected');
        return;
    }

    try {
        const mongoUri = config.mongoUri;

        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        const connection = await mongoose.connect(mongoUri, {
            retryWrites: true,
            w: 'majority',
            maxPoolSize: 10,
            socketTimeoutMS: 45000,
        });

        isConnected = true;

        console.log(
            `✅ MongoDB connected successfully: ${connection.connection.host}:${connection.connection.port}/${connection.connection.name}`
        );

        // Handle connection events
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected');
            isConnected = false;
        });

        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected');
            isConnected = true;
        });

        mongoose.connection.on('error', (error) => {
            console.error('❌ MongoDB connection error:', error);
            isConnected = false;
        });
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error instanceof Error ? error.message : error);
        isConnected = false;
        throw error;
    }
};

/**
 * Disconnect from MongoDB
 */
export const disconnectDB = async (): Promise<void> => {
    try {
        if (isConnected) {
            await mongoose.disconnect();
            isConnected = false;
            console.log('✅ MongoDB disconnected successfully');
        }
    } catch (error) {
        console.error('❌ MongoDB disconnection failed:', error instanceof Error ? error.message : error);
        throw error;
    }
};

/**
 * Get the current connection status
 */
export const isDBConnected = (): boolean => isConnected;

export default connectDB;
