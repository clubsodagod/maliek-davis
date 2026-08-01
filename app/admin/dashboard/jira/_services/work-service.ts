import type {
  AnswerCompletionRequest,
  AnswerSaveRequest,
  AnswerValidationRequest,
  AnswerView,
  ApiFailure,
  ApiResult,
  ProjectSummaryView,
  SubtaskQuestionView,
  WorkQueueView,
} from "../_types";
import type { TaskTypeSlug, WorkStatusSlug } from "../_config/workManagement";

type FetchOptions = {
  signal?: AbortSignal;
};

type WorkQueueRequest = {
  statusSlug?: WorkStatusSlug;
  taskTypeSlug?: TaskTypeSlug;
  search?: string;
  sort?: string;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiResult<T>(value: unknown): value is ApiResult<T> {
  if (!isObject(value) || typeof value.success !== "boolean") return false;
  if (value.success === true) {
    return "data" in value && typeof value.requestId === "string";
  }
  return (
    isObject(value.error) &&
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

async function fetchJiraWorkApi<T>(
  path: string,
  init: RequestInit = {},
): Promise<ApiResult<T>> {
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
    return transportFailure("Unable to reach the Jira work API route.");
  }

  const body: unknown = await response.json().catch(() => null);
  return isApiResult<T>(body)
    ? body
    : transportFailure("Jira work API route returned an unexpected response.");
}

function workspacePath(projectKey: string): string {
  return `/api/jira/workspaces/${encodeURIComponent(projectKey)}`;
}

export async function getProjectSummaryRequest(
  projectKey: string,
  options: FetchOptions = {},
): Promise<ApiResult<ProjectSummaryView>> {
  return fetchJiraWorkApi<ProjectSummaryView>(
    `${workspacePath(projectKey)}/summary`,
    {
      method: "GET",
      signal: options.signal,
    },
  );
}

export async function getWorkQueueRequest(
  projectKey: string,
  query: WorkQueueRequest = {},
  options: FetchOptions = {},
): Promise<ApiResult<WorkQueueView>> {
  const params = new URLSearchParams();
  if (query.statusSlug) params.set("status", query.statusSlug);
  if (query.taskTypeSlug) params.set("taskType", query.taskTypeSlug);
  if (query.search) params.set("search", query.search);
  if (query.sort) params.set("sort", query.sort);
  const queryString = params.toString();

  return fetchJiraWorkApi<WorkQueueView>(
    `${workspacePath(projectKey)}/work${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
      signal: options.signal,
    },
  );
}

export async function getSubtaskQuestionRequest(
  projectKey: string,
  issueIdOrKey: string,
  options: FetchOptions = {},
): Promise<ApiResult<SubtaskQuestionView>> {
  return fetchJiraWorkApi<SubtaskQuestionView>(
    `${workspacePath(projectKey)}/questions/${encodeURIComponent(issueIdOrKey)}`,
    {
      method: "GET",
      signal: options.signal,
    },
  );
}

export async function saveAnswerRequest(
  projectKey: string,
  issueIdOrKey: string,
  input: AnswerSaveRequest,
): Promise<ApiResult<AnswerView>> {
  return fetchJiraWorkApi<AnswerView>(
    `${workspacePath(projectKey)}/answers/${encodeURIComponent(issueIdOrKey)}`,
    {
      method: "PUT",
      body: JSON.stringify(input),
    },
  );
}

export async function validateAnswerRequest(
  projectKey: string,
  issueIdOrKey: string,
  input: AnswerValidationRequest,
): Promise<ApiResult<AnswerView>> {
  return fetchJiraWorkApi<AnswerView>(
    `${workspacePath(projectKey)}/answers/${encodeURIComponent(issueIdOrKey)}/validate`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export async function completeAnswerRequest(
  projectKey: string,
  issueIdOrKey: string,
  input: AnswerCompletionRequest,
): Promise<ApiResult<AnswerView>> {
  return fetchJiraWorkApi<AnswerView>(
    `${workspacePath(projectKey)}/answers/${encodeURIComponent(issueIdOrKey)}/complete`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}
