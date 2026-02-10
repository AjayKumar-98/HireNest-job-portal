import app from './app';
import config from './config/config';
import { connectDB } from './config/database';

let server: any;

const startServer = async (): Promise<void> => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start the server
        server = app.listen(config.port, () => {
            console.log(`\n🚀 Server running on http://localhost:${config.port}`);
            console.log(`📝 Environment: ${config.nodeEnv}`);
            console.log(`🔗 CORS Origin: ${config.corsOrigin}\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    console.log('\n📋 SIGTERM received. Shutting down gracefully...');
    try {
        if (server) {
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        } else {
            process.exit(0);
        }
    } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
    }
});

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', async () => {
    console.log('\n📋 SIGINT received. Shutting down gracefully...');
    try {
        if (server) {
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        } else {
            process.exit(0);
        }
    } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
    }
});

// Start the server
startServer();
