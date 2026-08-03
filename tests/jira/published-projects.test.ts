import { afterEach, describe, expect, it, vi } from "vitest";
import { listJiraProjectSummaries } from "@/app/api/jira/_lib/service";
import { jiraProjectSummaryListSchema } from "@/app/admin/dashboard/jira/_schemas";

vi.mock("@/app/api/jira/_lib/user-credentials", () => ({
  getRequiredJiraCredential: vi.fn(async () => ({
    baseUrl: "https://example.atlassian.net",
    email: "person@example.com",
    apiToken: "jira-token",
  })),
}));

describe("Jira project summaries", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("accepts all-project summary responses", () => {
    const result = jiraProjectSummaryListSchema.safeParse([
      {
        key: "PBMLV",
        name: "Pearl Box",
        description: "Published project workspace.",
      },
      {
        key: "OPS",
        name: "Operations",
      },
    ]);

    expect(result.success).toBe(true);
  });

  it("forwards all-project summary requests to the automation server", async () => {
    vi.stubEnv("JIRA_AUTOMATION_DEV_SERVER_URL", "https://jira-server.test");
    vi.stubEnv("JIRA_AUTOMATION_SERVER_TOKEN", "server-token");
    vi.stubEnv("JIRA_REQUEST_TIMEOUT_MS", "1000");

    const fetchMock = vi.fn(
      async (url: URL | RequestInfo, init?: RequestInit) => {
        expect(String(url)).toBe("https://jira-server.test/api/projects/summary");
        expect(init?.method).toBe("GET");
        expect(init?.headers).toMatchObject({
          "X-App-User-Id": "user-1",
          "X-App-User-Role": "admin",
          "X-Jira-Base-Url": "https://example.atlassian.net",
          "X-Jira-Email": "person@example.com",
          "X-Jira-Api-Token": "jira-token",
        });

        return new Response(
          JSON.stringify([{ key: "PBMLV", name: "Pearl Box" }]),
          {
            status: 200,
          },
        );
      },
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      listJiraProjectSummaries("request-1", {
        userId: "user-1",
        role: "admin",
      }),
    ).resolves.toEqual([{ key: "PBMLV", name: "Pearl Box" }]);
  });
});
