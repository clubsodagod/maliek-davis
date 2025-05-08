// utils/getBaseApiUrl.ts
export function getBaseApiUrl() {
    switch (process.env.NODE_ENV) {
        case 'development':
            return process.env.NEXT_PUBLIC_DEVELOPMENT_URL;
        case 'test':
            return process.env.NEXT_PUBLIC_PRODUCTION_TEST_URL;
        case 'production':
        default:
            return process.env.NEXT_PUBLIC_PRODUCTION_URL;
    }
}
