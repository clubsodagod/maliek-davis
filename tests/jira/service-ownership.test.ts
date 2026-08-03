import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createJiraSetup, getJiraSetup, listJiraSetups } from "@/app/api/jira/_lib/service";
import { getJiraProjectTemplateById } from "@/app/admin/dashboard/jira/_config/projectOptions";

const setupTemplate = getJiraProjectTemplateById("business-process-control");

const setupResponse = {
  id: "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
  ownerUserId: "user-2",
  status: "draft",
  request: {
    project: {
      key: "GEN",
      name: "General Project",
      projectTypeKey: setupTemplate.projectTypeKey,
      projectTemplateKey: setupTemplate.projectTemplateKey,
    },
    issueHierarchy: {
      workstreamIssueType: "Workstream",
      taskIssueType: "Task",
      subtaskIssueType: "Sub-task",
    },
    workflow: {
      id: "jira-default",
    },
    workstreams: [],
  },
  createdAt: "2026-07-23T12:00:00.000Z",
  updatedAt: "2026-07-23T12:00:00.000Z",
};

describe("Jira service ownership", () => {
  beforeEach(() => {
    vi.stubEnv("JIRA_AUTOMATION_DEV_SERVER_URL", "https://jira-server.test");
    vi.stubEnv("JIRA_AUTOMATION_SERVER_TOKEN", "server-token");
    vi.stubEnv("JIRA_REQUEST_TIMEOUT_MS", "1000");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("hides setup records owned by another user", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify(setupResponse), {
            status: 200,
          }),
      ),
    );

    await expect(
      getJiraSetup("a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1", "request-1", {
        userId: "user-1",
        role: "admin",
      }),
    ).rejects.toMatchObject({
      code: "NOT_FOUND",
      status: 404,
    });
  });

  it("reads a setup through the automation server detail endpoint", async () => {
    const fetchMock = vi.fn(
      async (url: URL | RequestInfo, init?: RequestInit) => {
        expect(String(url)).toBe(
          "https://jira-server.test/api/project-setups/a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
        );
        expect(init?.method).toBe("GET");

        return new Response(
          JSON.stringify({ ...setupResponse, ownerUserId: "user-1" }),
          {
            status: 200,
          },
        );
      },
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      getJiraSetup("a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1", "request-1", {
        userId: "user-1",
        role: "admin",
      }),
    ).resolves.toEqual({ ...setupResponse, ownerUserId: "user-1" });
  });

  it("sends canonical backend link payloads when creating setup drafts", async () => {
    const fetchMock = vi.fn(
      async (_url: URL | RequestInfo, init?: RequestInit) => {
        const body = JSON.parse(String(init?.body)) as {
          workstreams: {
            links?: { targetRef: string; linkType: string }[];
            tasks?: { links?: { targetRef: string; linkType: string; relationship?: string }[] }[];
          }[];
        };

        expect(body.workstreams[0]?.links?.[0]).toEqual({
          targetRef: "brand",
          linkType: "Blocks",
        });
        expect(body.workstreams[0]?.tasks?.[0]?.links?.[0]).toEqual({
          targetRef: "brand-task",
          linkType: "Relates",
          relationship: "informs",
        });

        return new Response(
          JSON.stringify({ ...setupResponse, ownerUserId: "user-1" }),
          {
            status: 201,
          },
        );
      },
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      createJiraSetup(
        {
          project: setupResponse.request.project,
          issueHierarchy: setupResponse.request.issueHierarchy,
          workflow: {
            id: "jira-default",
          },
          workstreams: [
            {
              ref: "company",
              summary: "Company",
              links: [
                {
                  ref: "company-blocks-brand",
                  type: "Blocks",
                  sourceRef: "company",
                  inwardRef: "brand",
                  outwardRef: "company",
                },
              ],
              tasks: [
                {
                  ref: "company-task",
                  summary: "Company Task",
                  links: [
                    {
                      ref: "company-task-informs-brand-task",
                      type: "Informs",
                      sourceRef: "company-task",
                      inwardRef: "brand-task",
                      outwardRef: "company-task",
                      relationship: "informs",
                    },
                  ],
                },
              ],
            },
            {
              ref: "brand",
              summary: "Brand",
              tasks: [
                {
                  ref: "brand-task",
                  summary: "Brand Task",
                },
              ],
            },
          ],
        },
        "request-1",
        {
          userId: "user-1",
          role: "admin",
        },
      ),
    ).resolves.toEqual({ ...setupResponse, ownerUserId: "user-1" });
  });

  it("lists setup records owned by the current user", async () => {
    const fetchMock = vi.fn(
      async (url: URL | RequestInfo, init?: RequestInit) => {
        expect(String(url)).toBe("https://jira-server.test/api/project-setups");
        expect(init?.method).toBe("GET");

        return new Response(
          JSON.stringify([{ ...setupResponse, ownerUserId: "user-1" }]),
          {
            status: 200,
          },
        );
      },
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      listJiraSetups("request-1", {
        userId: "user-1",
        role: "admin",
      }),
    ).resolves.toEqual([{ ...setupResponse, ownerUserId: "user-1" }]);
  });

  it("hides setup registry responses containing another user's records", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify([setupResponse]), {
            status: 200,
          }),
      ),
    );

    await expect(
      listJiraSetups("request-1", {
        userId: "user-1",
        role: "admin",
      }),
    ).rejects.toMatchObject({
      code: "NOT_FOUND",
      status: 404,
    });
  });

  it("rejects invalid setup registry responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ setups: [] }), {
            status: 200,
          }),
      ),
    );

    await expect(
      listJiraSetups("request-1", {
        userId: "user-1",
        role: "admin",
      }),
    ).rejects.toMatchObject({
      code: "UPSTREAM_INVALID_RESPONSE",
      status: 502,
    });
  });
});
