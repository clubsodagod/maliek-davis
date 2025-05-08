// config/appConfig.ts
export const appConfig = {
    API_URL:
        process.env.NODE_ENV === 'development'
            ? process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL
            : process.env.NODE_ENV === 'test'
                ? process.env.NEXT_PUBLIC_PRODUCTION_TEST_API_URL
                : process.env.NEXT_PUBLIC_PRODUCTION_API_URL,
};
