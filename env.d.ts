declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_NODE_ENV: 'development' | 'production' | 'test';
        AUTH_SECRET: string;
        NEXT_PUBLIC_DEVELOPMENT_URL: string;
        NEXT_PUBLIC_PRODUCTION_TEST_URL: string;
        NEXT_PUBLIC_PRODUCTION_URL: string;

        NEXT_PUBLIC_DEVELOPMENT_API_URL: string;
        NEXT_PUBLIC_PRODUCTION_DEDICATED_SERVER_URL: string;
        NEXT_PUBLIC_PRODUCTION_API_URL: string;

        AUTH_GOOGLE_ID: string;
        AUTH_GOOGLE_SECRET: string;

        MONGODB_URI: string;

        JIRA_AUTOMATION_DEV_SERVER_URL: string;
        JIRA_AUTOMATION_PRODUCTION_SERVER_URL: string;
        JIRA_AUTOMATION_SERVER_URL?: string;
        JIRA_AUTOMATION_SERVER_TOKEN: string;
        JIRA_REQUEST_TIMEOUT_MS?: string;
        JIRA_E2E_BASE_URL?: string;
        JIRA_E2E_SETUP_ID?: string;
        JIRA_E2E_STORAGE_STATE?: string;
        JIRA_E2E_UNAUTHORIZED_SETUP_ID?: string;
        PLAYWRIGHT_START_SERVER?: string;

        NEXT_PUBLIC_TINY_MCE_API_KEY: string;
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
        NEXT_PUBLIC_CLOUDINARY_API_KEY: string;
        NEXT_PUBLIC_CLOUDINARY_API_SECRET: string;
        NEXT_PUBLIC_API_ENVIRONMENT_VARIABLE: string;

        NEXT_PUBLIC_RESEND_API_KEY:string;
    }
}
