import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.JIRA_E2E_BASE_URL ?? "http://127.0.0.1:3000";
const shouldStartServer = process.env.PLAYWRIGHT_START_SERVER === "1";
const storageState = process.env.JIRA_E2E_STORAGE_STATE;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL,
    trace: "retain-on-failure",
    ...(storageState ? { storageState } : {}),
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  ...(shouldStartServer
    ? {
        webServer: {
          command: "npm.cmd run dev",
          url: baseURL,
          reuseExistingServer: true,
          timeout: 120_000,
        },
      }
    : {}),
});
