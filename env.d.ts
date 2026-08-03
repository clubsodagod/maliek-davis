declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV?: "development" | "production" | "test";
        readonly VERCEL_ENV?: "development" | "preview" | "production";

        readonly AUTH_SECRET: string;
        readonly MONGODB_URI: string;

        readonly NEXT_PUBLIC_NODE_ENV?: "development" | "production" | "test";
        readonly NEXT_PUBLIC_DEVELOPMENT_URL: string;
        readonly NEXT_PUBLIC_PRODUCTION_TEST_URL: string;
        readonly NEXT_PUBLIC_PRODUCTION_URL: string;

        readonly NEXT_PUBLIC_DEVELOPMENT_API_URL: string;
        readonly NEXT_PUBLIC_PRODUCTION_TEST_API_URL?: string;
        readonly NEXT_PUBLIC_PRODUCTION_DEDICATED_SERVER_URL?: string;
        readonly NEXT_PUBLIC_PRODUCTION_API_URL: string;
        readonly NEXT_PUBLIC_API_ENVIRONMENT_VARIABLE?: string;

        readonly AUTH_GOOGLE_ID?: string;
        readonly AUTH_GOOGLE_SECRET?: string;

        readonly JIRA_AUTOMATION_DEV_SERVER_URL: string;
        readonly JIRA_AUTOMATION_PRODUCTION_SERVER_URL: string;
        readonly JIRA_AUTOMATION_SERVER_URL?: string;
        readonly JIRA_AUTOMATION_SERVER_TOKEN: string;
        readonly JIRA_REQUEST_TIMEOUT_MS?: string;
        readonly JIRA_CREDENTIAL_ENCRYPTION_KEY: string;
        readonly JIRA_E2E_BASE_URL?: string;
        readonly JIRA_E2E_SETUP_ID?: string;
        readonly JIRA_E2E_STORAGE_STATE?: string;
        readonly JIRA_E2E_UNAUTHORIZED_SETUP_ID?: string;
        readonly PLAYWRIGHT_START_SERVER?: string;

        readonly NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
        readonly STRIPE_SECRET_KEY?: string;

        readonly NEXT_PUBLIC_TINY_MCE_API_KEY?: string;
        readonly NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
        readonly NEXT_PUBLIC_CLOUDINARY_API_KEY?: string;
        readonly NEXT_PUBLIC_CLOUDINARY_API_SECRET?: string;
        readonly CLOUDINARY_CLOUD_NAME?: string;
        readonly CLOUDINARY_API_KEY?: string;
        readonly CLOUDINARY_API_SECRET?: string;

        readonly NEXT_PUBLIC_RESEND_API_KEY: string;
    }
}
