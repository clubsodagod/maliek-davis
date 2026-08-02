import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { JiraAppError } from "@/app/api/jira/_lib/errors";
import { sendJiraUpstreamRequest } from "@/app/api/jira/_lib/upstream-client";

const actor = {
  userId: "user-1",
  role: "admin" as const,
};

describe("Jira upstream client", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("JIRA_AUTOMATION_DEV_SERVER_URL", "https://jira-server.test");
    vi.stubEnv("JIRA_AUTOMATION_SERVER_TOKEN", "server-token");
    vi.stubEnv("JIRA_REQUEST_TIMEOUT_MS", "1000");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("normalizes successful upstream responses and forwards trusted actor headers", async () => {
    const fetchMock = vi.fn(async (_url: URL | RequestInfo, init?: RequestInit) => {
      expect(init?.method).toBe("GET");
      expect((init?.headers as Record<string, string>)["X-App-User-Id"]).toBe(
        "user-1",
      );
      expect((init?.headers as Record<string, string>).Authorization).toBe(
        "Bearer server-token",
      );

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendJiraUpstreamRequest({
        method: "GET",
        path: "/health",
        responseSchema: z.object({ ok: z.boolean() }),
        requestId: "request-1",
        actor,
      }),
    ).resolves.toEqual({ ok: true });
  });

  it("rejects invalid upstream responses", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ nope: true }), { status: 200 })),
    );

    await expect(
      sendJiraUpstreamRequest({
        method: "GET",
        path: "/health",
        responseSchema: z.object({ ok: z.boolean() }),
        requestId: "request-1",
        actor,
      }),
    ).rejects.toMatchObject({
      code: "UPSTREAM_INVALID_RESPONSE",
      status: 502,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "[Jira API] Invalid upstream response",
      expect.objectContaining({
        requestId: "request-1",
        method: "GET",
        path: "/health",
        issueCount: 1,
        issues: [
          expect.objectContaining({
            path: "ok",
            code: "invalid_type",
          }),
        ],
      }),
    );
  });

  it("translates upstream authentication failures without exposing tokens", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ error: "Unauthorized." }), { status: 401 })),
    );

    await expect(
      sendJiraUpstreamRequest({
        method: "GET",
        path: "/health",
        responseSchema: z.object({ ok: z.boolean() }),
        requestId: "request-1",
        actor,
      }),
    ).rejects.toMatchObject({
      code: "UPSTREAM_AUTH_FAILED",
      message: "Jira automation server rejected application credentials.",
    });
  });

  it("does not retry unsafe mutations", async () => {
    const fetchMock = vi.fn(
      async () => new Response(JSON.stringify({ error: "Down." }), { status: 503 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendJiraUpstreamRequest({
        method: "POST",
        path: "/api/project-setups",
        responseSchema: z.object({ id: z.string() }),
        requestId: "request-1",
        actor,
        retrySafe: true,
      }),
    ).rejects.toBeInstanceOf(JiraAppError);

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("forwards setup registry list requests to the automation server", async () => {
    const fetchMock = vi.fn(async (url: URL | RequestInfo, init?: RequestInit) => {
      expect(String(url)).toBe("https://jira-server.test/api/project-setups");
      expect(init?.method).toBe("GET");

      return new Response(JSON.stringify([]), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendJiraUpstreamRequest({
        method: "GET",
        path: "/api/project-setups",
        responseSchema: z.array(z.unknown()),
        requestId: "request-1",
        actor,
        retrySafe: true,
      }),
    ).resolves.toEqual([]);
  });

  it("uses the development automation URL in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const fetchMock = vi.fn(async (url: URL | RequestInfo) => {
      expect(String(url)).toBe("https://jira-server.test/health");
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendJiraUpstreamRequest({
        method: "GET",
        path: "/health",
        responseSchema: z.object({ ok: z.boolean() }),
        requestId: "request-1",
        actor,
      }),
    ).resolves.toEqual({ ok: true });
  });

  it("uses the production automation URL in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("JIRA_AUTOMATION_PRODUCTION_SERVER_URL", "https://jira-production.test");
    const fetchMock = vi.fn(async (url: URL | RequestInfo) => {
      expect(String(url)).toBe("https://jira-production.test/health");
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendJiraUpstreamRequest({
        method: "GET",
        path: "/health",
        responseSchema: z.object({ ok: z.boolean() }),
        requestId: "request-1",
        actor,
      }),
    ).resolves.toEqual({ ok: true });
  });

  it("uses the production automation URL when Vercel is production", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("JIRA_AUTOMATION_PRODUCTION_SERVER_URL", "https://jira-vercel-production.test");
    const fetchMock = vi.fn(async (url: URL | RequestInfo) => {
      expect(String(url)).toBe("https://jira-vercel-production.test/health");
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendJiraUpstreamRequest({
        method: "GET",
        path: "/health",
        responseSchema: z.object({ ok: z.boolean() }),
        requestId: "request-1",
        actor,
      }),
    ).resolves.toEqual({ ok: true });
  });

  it("names the selected environment URL when it is missing", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("JIRA_AUTOMATION_PRODUCTION_SERVER_URL", "");
    vi.stubEnv("JIRA_AUTOMATION_SERVER_URL", "");

    await expect(
      sendJiraUpstreamRequest({
        method: "GET",
        path: "/health",
        responseSchema: z.object({ ok: z.boolean() }),
        requestId: "request-1",
        actor,
      }),
    ).rejects.toMatchObject({
      code: "INTERNAL_ERROR",
      message: "Jira automation server is not configured. Set JIRA_AUTOMATION_PRODUCTION_SERVER_URL.",
    });
  });

  it("falls back to the legacy automation URL when the selected URL is missing", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("JIRA_AUTOMATION_DEV_SERVER_URL", "");
    vi.stubEnv("JIRA_AUTOMATION_SERVER_URL", "https://jira-legacy.test");
    const fetchMock = vi.fn(async (url: URL | RequestInfo) => {
      expect(String(url)).toBe("https://jira-legacy.test/health");
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendJiraUpstreamRequest({
        method: "GET",
        path: "/health",
        responseSchema: z.object({ ok: z.boolean() }),
        requestId: "request-1",
        actor,
      }),
    ).resolves.toEqual({ ok: true });
  });
});
