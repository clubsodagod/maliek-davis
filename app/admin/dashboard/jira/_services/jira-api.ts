import type {
  ApiFailure,
  ApiResult,
  JiraHealthResult,
  JiraProjectSetupRequest,
  JiraProjectSummaryList,
  JiraRunRecord,
  JiraSetupList,
  JiraSetupRecord,
  JiraValidationResult,
} from "../_types";

type FetchOptions = {
  signal?: AbortSignal;
};

type ApiFetchResult<T> = {
  result: ApiResult<T>;
  retryAfterSeconds?: number;
};

type PollJiraRunOptions = {
  signal?: AbortSignal;
  initialIntervalMs?: number;
  maxIntervalMs?: number;
  onUpdate?: (run: JiraRunRecord) => void;
};

const TERMINAL_RUN_STATUSES = new Set<JiraRunRecord["status"]>([
  "succeeded",
  "failed",
]);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiResult<T>(value: unknown): value is ApiResult<T> {
  if (!isObject(value) || typeof value.success !== "boolean") return false;

  if (value.success === true) {
    return "data" in value && typeof value.requestId === "string";
  }

  if (!isObject(value.error)) return false;

  return (
    typeof value.error.code === "string" &&
    typeof value.error.message === "string" &&
    typeof value.error.retryable === "boolean" &&
    typeof value.requestId === "string"
  );
}

function transportFailure(message: string): ApiFailure {
  return {
    success: false,
    error: {
      code: "BAD_REQUEST",
      message,
      retryable: false,
    },
    requestId: crypto.randomUUID(),
  };
}

async function fetchJiraApi<T>(
  path: string,
  init: RequestInit = {},
): Promise<ApiFetchResult<T>> {
  let response: Response;

  try {
    response = await fetch(path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch {
    return {
      result: transportFailure("Unable to reach the Jira API route."),
    };
  }

  const retryAfter = response.headers.get("Retry-After");
  const retryAfterSeconds = retryAfter ? Number(retryAfter) : undefined;
  const body: unknown = await response.json().catch(() => null);

  if (!isApiResult<T>(body)) {
    return {
      result: transportFailure("Jira API route returned an unexpected response."),
      retryAfterSeconds,
    };
  }

  return {
    result: body,
    retryAfterSeconds: Number.isFinite(retryAfterSeconds)
      ? retryAfterSeconds
      : undefined,
  };
}

export async function getJiraHealth(
  options: FetchOptions = {},
): Promise<ApiResult<JiraHealthResult>> {
  const { result } = await fetchJiraApi<JiraHealthResult>("/api/jira/health", {
    method: "GET",
    signal: options.signal,
  });
  return result;
}

export async function listJiraProjectSummariesRequest(
  options: FetchOptions = {},
): Promise<ApiResult<JiraProjectSummaryList>> {
  const { result } = await fetchJiraApi<JiraProjectSummaryList>(
    "/api/jira/projects/summary",
    {
      method: "GET",
      signal: options.signal,
    },
  );
  return result;
}

export async function validateJiraSetupRequest(
  request: JiraProjectSetupRequest,
  options: FetchOptions = {},
): Promise<ApiResult<JiraValidationResult>> {
  const { result } = await fetchJiraApi<JiraValidationResult>(
    "/api/jira/setups/validate",
    {
      method: "POST",
      body: JSON.stringify(request),
      signal: options.signal,
    },
  );
  return result;
}

export async function createJiraSetupRequest(
  request: JiraProjectSetupRequest,
): Promise<ApiResult<JiraSetupRecord>> {
  const { result } = await fetchJiraApi<JiraSetupRecord>("/api/jira/setups", {
    method: "POST",
    body: JSON.stringify(request),
  });
  return result;
}

export async function listJiraSetupRequests(
  options: FetchOptions = {},
): Promise<ApiResult<JiraSetupList>> {
  const { result } = await fetchJiraApi<JiraSetupList>("/api/jira/setups", {
    method: "GET",
    signal: options.signal,
  });
  return result;
}

export async function getJiraSetupRequest(
  setupId: string,
  options: FetchOptions = {},
): Promise<ApiResult<JiraSetupRecord>> {
  const { result } = await fetchJiraApi<JiraSetupRecord>(
    `/api/jira/setups/${encodeURIComponent(setupId)}`,
    {
      method: "GET",
      signal: options.signal,
    },
  );
  return result;
}

export async function updateJiraSetupRequest(
  setupId: string,
  request: JiraProjectSetupRequest,
): Promise<ApiResult<JiraSetupRecord>> {
  const { result } = await fetchJiraApi<JiraSetupRecord>(
    `/api/jira/setups/${encodeURIComponent(setupId)}`,
    {
      method: "PUT",
      body: JSON.stringify(request),
    },
  );
  return result;
}

export async function startJiraSetupRunRequest(
  setupId: string,
): Promise<ApiResult<JiraRunRecord>> {
  const { result } = await fetchJiraApi<JiraRunRecord>(
    `/api/jira/setups/${encodeURIComponent(setupId)}/runs`,
    {
      method: "POST",
    },
  );
  return result;
}

export async function getJiraRunRequest(
  runId: string,
  options: FetchOptions = {},
): Promise<ApiResult<JiraRunRecord>> {
  const { result } = await fetchJiraApi<JiraRunRecord>(
    `/api/jira/runs/${encodeURIComponent(runId)}`,
    {
      method: "GET",
      signal: options.signal,
    },
  );
  return result;
}

export async function getJiraRunReportRequest(
  runId: string,
  options: FetchOptions = {},
): Promise<ApiResult<string>> {
  const { result } = await fetchJiraApi<string>(
    `/api/jira/runs/${encodeURIComponent(runId)}/report`,
    {
      method: "GET",
      signal: options.signal,
    },
  );
  return result;
}

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Polling cancelled.", "AbortError"));
      return;
    }

    const timeout = setTimeout(resolve, ms);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeout);
        reject(new DOMException("Polling cancelled.", "AbortError"));
      },
      { once: true },
    );
  });
}

export async function pollJiraRun(
  runId: string,
  options: PollJiraRunOptions = {},
): Promise<ApiResult<JiraRunRecord>> {
  let intervalMs = options.initialIntervalMs ?? 2_000;
  const maxIntervalMs = options.maxIntervalMs ?? 15_000;

  while (!options.signal?.aborted) {
    const { result, retryAfterSeconds } = await fetchJiraApi<JiraRunRecord>(
      `/api/jira/runs/${encodeURIComponent(runId)}`,
      {
        method: "GET",
        signal: options.signal,
      },
    );

    if (result.success) {
      options.onUpdate?.(result.data);

      if (TERMINAL_RUN_STATUSES.has(result.data.status)) {
        return result;
      }
    } else if (!result.error.retryable) {
      return result;
    }

    const retryAfterMs = retryAfterSeconds ? retryAfterSeconds * 1000 : 0;
    await wait(Math.max(intervalMs, retryAfterMs), options.signal);
    intervalMs = Math.min(maxIntervalMs, Math.ceil(intervalMs * 1.5));
  }

  return transportFailure("Jira run polling was cancelled.");
}
