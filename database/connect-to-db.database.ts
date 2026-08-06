import mongoose, { connect, set, type Mongoose, type ConnectOptions } from "mongoose";
import dotenv from 'dotenv';

// load env file
dotenv.config()

interface MongooseConnectionCache {
    connection?: Mongoose;
    promise?: Promise<Mongoose>;
}

const globalWithMongoose = globalThis as typeof globalThis & {
    mongooseConnectionCache?: MongooseConnectionCache;
};

const connectionCache = globalWithMongoose.mongooseConnectionCache ??= {};

// connect to the database

export default async function connectToDB(): Promise<Mongoose> {
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }

    if (connectionCache.connection !== undefined) {
        return connectionCache.connection;
    }

    const mongoDbUri = process.env.MONGODB_URI?.trim();
    if (mongoDbUri === undefined || mongoDbUri === "") {
        throw new Error("Missing required environment variable: MONGODB_URI");
    }

    try {
        set('strictQuery', false);
        connectionCache.promise ??= connect(mongoDbUri, mongooseConnectionOptions());
        connectionCache.connection = await connectionCache.promise;

        console.log('MongoDB connected to', connectionCache.connection.connection.name);
        return connectionCache.connection;
    } catch (error) {
        connectionCache.promise = undefined;
        console.error(error);
        throw error;
    }
}

function mongooseConnectionOptions(): ConnectOptions {
    return {
        maxPoolSize: readPositiveIntegerEnv("MONGODB_MAX_POOL_SIZE", 20),
        minPoolSize: readNonNegativeIntegerEnv("MONGODB_MIN_POOL_SIZE", 0),
        maxIdleTimeMS: readPositiveIntegerEnv("MONGODB_MAX_IDLE_TIME_MS", 60_000),
        serverSelectionTimeoutMS: readPositiveIntegerEnv("MONGODB_SERVER_SELECTION_TIMEOUT_MS", 5_000),
        connectTimeoutMS: readPositiveIntegerEnv("MONGODB_CONNECT_TIMEOUT_MS", 10_000),
        socketTimeoutMS: readPositiveIntegerEnv("MONGODB_SOCKET_TIMEOUT_MS", 45_000),
        retryReads: true,
        retryWrites: true,
    };
}

function readPositiveIntegerEnv(name: keyof NodeJS.ProcessEnv, fallback: number): number {
    const value = readOptionalIntegerEnv(name);
    return value === undefined || value <= 0 ? fallback : value;
}

function readNonNegativeIntegerEnv(name: keyof NodeJS.ProcessEnv, fallback: number): number {
    const value = readOptionalIntegerEnv(name);
    return value === undefined || value < 0 ? fallback : value;
}

function readOptionalIntegerEnv(name: keyof NodeJS.ProcessEnv): number | undefined {
    const raw = process.env[name]?.trim();
    if (raw === undefined || raw === "") {
        return undefined;
    }
    const value = Number.parseInt(raw, 10);
    return Number.isInteger(value) ? value : undefined;
}
