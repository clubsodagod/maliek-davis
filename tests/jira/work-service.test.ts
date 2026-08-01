import { afterEach, describe, expect, it, vi } from "vitest";
import {
  completeAnswerRequest,
  getWorkQueueRequest,
  saveAnswerRequest,
} from "@/app/admin/dashboard/jira/_services/work-service";

const apiSuccess = {
  success: true,
  data: {
    project: { key: "PBMLV", name: "Pearl Box" },
    filters: {
      statusSlug: "ready",
      status: "Ready",
      sort: "recommended",
    },
    counts: {
      total: 0,
      byStatus: [],
      byTaskType: [],
    },
    items: [],
    synchronizationHealth: {
      jira: "synced",
      confluence: "not_configured",
    },
    partialSynchronization: false,
  },
  requestId: "request-1",
};

describe("Jira work service", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("requests queue filters through the same-origin Jira API", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(apiSuccess)));
    vi.stubGlobal("fetch", fetchMock);

    const result = await getWorkQueueRequest("PBMLV", {
      statusSlug: "ready",
      taskTypeSlug: "subtask",
      search: "company",
    });

    expect(result.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/jira/workspaces/PBMLV/work?status=ready&taskType=subtask&search=company",
      expect.objectContaining({ method: "GET", cache: "no-store" }),
    );
  });

  it("sends answer mutation bodies", async () => {
    const answer = {
      success: true,
      data: {
        issueIdOrKey: "PBMLV-3",
        version: 1,
        status: "draft",
        answer: "Investor-ready answer.",
        evidence: [],
        validation: {
          passed: false,
          errors: [],
          warnings: [],
        },
      },
      requestId: "request-1",
    };
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(answer)));
    vi.stubGlobal("fetch", fetchMock);

    await saveAnswerRequest("PBMLV", "PBMLV-3", {
      version: 0,
      answer: "Investor-ready answer.",
      evidence: [],
    });
    await completeAnswerRequest("PBMLV", "PBMLV-3", { version: 1 });

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/jira/workspaces/PBMLV/answers/PBMLV-3",
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify({
          version: 0,
          answer: "Investor-ready answer.",
          evidence: [],
        }),
      }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/jira/workspaces/PBMLV/answers/PBMLV-3/complete",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ version: 1 }),
      }),
    );
  });
});
