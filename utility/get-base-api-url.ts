
import dotenv from 'dotenv';

// load env file
dotenv.config()

// utils/getBaseApiUrl.ts
export function getBaseApiUrl() {
    switch (process.env.NODE_ENV) {
        case 'development':
            return process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL;
        case 'test':
            return process.env.NEXT_PUBLIC_PRODUCTION_TEST_URL;
        case 'production':
        default:
            return process.env.NEXT_PUBLIC_PRODUCTION_URL;
    }
}

// utils/getBaseUrl.ts
export function getBaseUrl() {
    const env = process.env.NODE_ENV || 'development';
    console.log(env);
    
    switch (env) {
        case 'development':
            return process.env.NEXT_PUBLIC_DEVELOPMENT_URL;
        case 'test':
            return process.env.NEXT_PUBLIC_PRODUCTION_TEST_URL;
        case 'production':
        default:
            return process.env.NEXT_PUBLIC_PRODUCTION_URL;
    }
}
