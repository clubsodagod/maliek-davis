import { z } from "zod";
import type { JiraAdminIdentity } from "./auth";
import { JiraAppError } from "./errors";

export type JiraUpstreamMethod = "GET" | "POST" | "PUT" | "PATCH";

export type JiraUpstreamCredential = {
  baseUrl: string;
  email: string;
  apiToken: string;
};

export type JiraUpstreamRequest<T> = {
  method: JiraUpstreamMethod;
  path: string;
  responseSchema: z.ZodType<T>;
  body?: unknown;
  requestId: string;
  actor?: JiraAdminIdentity;
  signal?: AbortSignal;
  retrySafe?: boolean;
  responseType?: "json" | "text";
  jiraCredential?: JiraUpstreamCredential;
};

function getJiraAutomationConfig() {
  const { value: baseUrl, selectedName } = resolveJiraAutomationServerUrl();
  const token = process.env.JIRA_AUTOMATION_SERVER_TOKEN;
  const timeoutMs = Number(process.env.JIRA_REQUEST_TIMEOUT_MS ?? 15_000);

  if (!baseUrl) {
    throw new JiraAppError(
      "INTERNAL_ERROR",
      `Jira automation server is not configured. Set ${selectedName}.`,
    );
  }

  if (!token) {
    throw new JiraAppError(
      "INTERNAL_ERROR",
      "Jira automation server is not configured.",
    );
  }

  const parsedBaseUrl = new URL(baseUrl);

  if (!Number.isFinite(timeoutMs) || timeoutMs < 1_000 || timeoutMs > 120_000_000_000) {
    throw new JiraAppError(
      "INTERNAL_ERROR",
      "Jira request timeout is not configured correctly.",
    );
  }

  return {
    baseUrl: parsedBaseUrl,
    token,
    timeoutMs,
  };
}

function resolveJiraAutomationServerUrl(): {
  value: string | undefined;
  selectedName: "JIRA_AUTOMATION_DEV_SERVER_URL" | "JIRA_AUTOMATION_PRODUCTION_SERVER_URL";
} {
  const selectedName = isProductionRuntime()
    ? "JIRA_AUTOMATION_PRODUCTION_SERVER_URL"
    : "JIRA_AUTOMATION_DEV_SERVER_URL";
  const selectedValue = process.env[selectedName]?.trim();

  return {
    value: selectedValue || process.env.JIRA_AUTOMATION_SERVER_URL?.trim(),
    selectedName,
  };
}

function isProductionRuntime(): boolean {
  return process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
}

function resolveAllowedUrl(baseUrl: URL, path: string): URL {
  if (!path.startsWith("/")) {
    throw new JiraAppError("INTERNAL_ERROR", "Invalid Jira upstream path.");
  }

  const url = new URL(path, baseUrl);

  if (url.origin !== baseUrl.origin) {
    throw new JiraAppError("INTERNAL_ERROR", "Invalid Jira upstream origin.");
  }

  return url;
}

function mergeAbortSignals(signalA: AbortSignal, signalB?: AbortSignal): AbortSignal {
  if (!signalB) return signalA;

  const controller = new AbortController();
  const abort = () => controller.abort();

  if (signalA.aborted || signalB.aborted) {
    controller.abort();
  } else {
    signalA.addEventListener("abort", abort, { once: true });
    signalB.addEventListener("abort", abort, { once: true });
  }

  return controller.signal;
}

async function parseResponse<T>(
  response: Response,
  request: JiraUpstreamRequest<T>,
): Promise<T> {
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new JiraAppError(
        "UPSTREAM_AUTH_FAILED",
        "Jira automation server rejected application credentials.",
      );
    }

    if (response.status === 404) {
      throw new JiraAppError("NOT_FOUND", "Jira resource not found.");
    }

    if (response.status === 409) {
      throw new JiraAppError("CONFLICT", "Jira setup status conflict.");
    }

    if (response.status === 422) {
      throw new JiraAppError(
        "VALIDATION_FAILED",
        await readUpstreamErrorMessage(response) ?? "Jira setup data is invalid.",
      );
    }

    throw new JiraAppError(
      "UPSTREAM_UNAVAILABLE",
      "Jira automation server request failed.",
    );
  }

  const data =
    request.responseType === "text" ? await response.text() : await response.json();
  const parsed = request.responseSchema.safeParse(data);

  if (!parsed.success) {
    logInvalidUpstreamResponse(request, parsed.error);
    throw new JiraAppError(
      "UPSTREAM_INVALID_RESPONSE",
      "Jira automation server returned an unexpected response.",
    );
  }

  return parsed.data;
}

async function readUpstreamErrorMessage(response: Response): Promise<string | undefined> {
  const text = await response.text();
  if (text.trim() === "") return undefined;

  try {
    const body = JSON.parse(text) as unknown;
    if (typeof body === "object" && body !== null) {
      const record = body as Record<string, unknown>;
      if (typeof record.error === "string" && record.error.trim() !== "") {
        return record.error;
      }
      if (typeof record.message === "string" && record.message.trim() !== "") {
        return record.message;
      }
    }
  } catch {
    return text;
  }

  return undefined;
}

function logInvalidUpstreamResponse<T>(
  request: JiraUpstreamRequest<T>,
  error: z.ZodError,
): void {
  console.error("[Jira API] Invalid upstream response", {
    requestId: request.requestId,
    method: request.method,
    path: request.path,
    issues: error.issues.slice(0, 12).map((issue) => ({
      path: issue.path.length === 0 ? "(root)" : issue.path.map(String).join("."),
      code: issue.code,
      message: issue.message,
    })),
    issueCount: error.issues.length,
  });
}

async function sendOnce<T>(request: JiraUpstreamRequest<T>): Promise<T> {
  const config = getJiraAutomationConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);
  const signal = mergeAbortSignals(controller.signal, request.signal);

  try {
    const response = await fetch(resolveAllowedUrl(config.baseUrl, request.path), {
      method: request.method,
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        "X-Request-Id": request.requestId,
        ...(request.actor
          ? {
              "X-App-User-Id": request.actor.userId,
              "X-App-User-Role": request.actor.role,
            }
          : {}),
        ...(request.jiraCredential
          ? {
              "X-Jira-Base-Url": request.jiraCredential.baseUrl,
              "X-Jira-Email": request.jiraCredential.email,
              "X-Jira-Api-Token": request.jiraCredential.apiToken,
            }
          : {}),
      },
      body:
        request.method === "GET" || request.body === undefined
          ? undefined
          : JSON.stringify(request.body),
      cache: "no-store",
      signal,
    });

    return await parseResponse(response, request);
  } catch (error) {
    if (error instanceof JiraAppError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new JiraAppError(
        "UPSTREAM_TIMEOUT",
        "Jira automation server timed out.",
      );
    }

    throw new JiraAppError(
      "UPSTREAM_UNAVAILABLE",
      "Jira automation server is unavailable.",
    );
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Sends an allowlisted Jira automation server request with timeout handling.
 *
 * Safe GET requests may be retried once; Jira mutations are never retried here
 * because duplicate issue creation must be prevented by upstream state.
 */
export async function sendJiraUpstreamRequest<T>(
  request: JiraUpstreamRequest<T>,
): Promise<T> {
  try {
    return await sendOnce(request);
  } catch (error) {
    if (
      request.retrySafe &&
      request.method === "GET" &&
      error instanceof JiraAppError &&
      error.retryable
    ) {
      return await sendOnce(request);
    }

    throw error;
  }
}
