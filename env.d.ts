declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_NODE_ENV: 'development' | 'production' | 'test';
        AUTH_SECRET: string;
        NEXT_PUBLIC_DEVELOPMENT_URL: string;
        NEXT_PUBLIC_PRODUCTION_TEST_URL: string;
        NEXT_PUBLIC_PRODUCTION_URL: string;

        NEXT_PUBLIC_DEVELOPMENT_API_URL: string;
        NEXT_PUBLIC_PRODUCTION_TEST_API_URL: string;
        NEXT_PUBLIC_PRODUCTION_API_URL: string;

        AUTH_GOOGLE_ID: string;
        AUTH_GOOGLE_SECRET: string;

        MONGODB_URI: string;

        NEXT_PUBLIC_TINY_MCE_API_KEY: string;
    }
}
