import {
  jiraHealthResultSchema,
  jiraProjectSetupRequestSchema,
  jiraReportSchema,
  jiraSetupListSchema,
  jiraRunRecordSchema,
  jiraSetupRecordSchema,
  jiraValidationResultSchema,
  projectSummaryViewSchema,
  workQueueViewSchema,
  subtaskQuestionViewSchema,
  answerViewSchema,
} from "@/app/admin/dashboard/jira/_schemas";
import type {
  AnswerCompletionRequest,
  AnswerSaveRequest,
  AnswerValidationRequest,
  JiraHealthResult,
  JiraProjectSetupRequest,
  JiraRunRecord,
  JiraSetupList,
  JiraSetupRecord,
  JiraValidationResult,
  ProjectSummaryView,
  SubtaskQuestionView,
  WorkQueueView,
} from "@/app/admin/dashboard/jira/_types";
import type { TaskTypeSlug, WorkStatusSlug } from "@/app/admin/dashboard/jira/_config/workManagement";
import type { JiraAdminIdentity } from "./auth";
import { JiraAppError } from "./errors";
import { sendJiraUpstreamRequest } from "./upstream-client";

function assertOwnedByCurrentUser(
  ownerUserId: string,
  actor: JiraAdminIdentity,
): void {
  if (ownerUserId !== actor.userId) {
    throw new JiraAppError("NOT_FOUND", "Jira resource not found.");
  }
}

export async function getJiraAutomationHealth(
  requestId: string,
  actor?: JiraAdminIdentity,
  signal?: AbortSignal,
): Promise<JiraHealthResult> {
  return sendJiraUpstreamRequest({
    method: "GET",
    path: "/health",
    responseSchema: jiraHealthResultSchema,
    requestId,
    actor,
    signal,
    retrySafe: true,
  });
}

export async function validateJiraSetup(
  request: JiraProjectSetupRequest,
  requestId: string,
  actor: JiraAdminIdentity,
  signal?: AbortSignal,
): Promise<JiraValidationResult> {
  const body = jiraProjectSetupRequestSchema.parse(request);

  return sendJiraUpstreamRequest({
    method: "POST",
    path: "/api/project-setups/validate",
    responseSchema: jiraValidationResultSchema,
    body,
    requestId,
    actor,
    signal,
  });
}

export async function createJiraSetup(
  request: JiraProjectSetupRequest,
  requestId: string,
  actor: JiraAdminIdentity,
): Promise<JiraSetupRecord> {
  const body = jiraProjectSetupRequestSchema.parse(request);

  const result = await sendJiraUpstreamRequest({
    method: "POST",
    path: "/api/project-setups",
    responseSchema: jiraSetupRecordSchema,
    body,
    requestId,
    actor,
  });

  assertOwnedByCurrentUser(result.ownerUserId, actor);
  return result;
}

export async function listJiraSetups(
  requestId: string,
  actor: JiraAdminIdentity,
  signal?: AbortSignal,
): Promise<JiraSetupList> {
  const result = await sendJiraUpstreamRequest({
    method: "GET",
    path: "/api/project-setups",
    responseSchema: jiraSetupListSchema,
    requestId,
    actor,
    signal,
    retrySafe: true,
  });

  result.forEach((setup) => assertOwnedByCurrentUser(setup.ownerUserId, actor));
  return result;
}

export async function getJiraSetup(
  setupId: string,
  requestId: string,
  actor: JiraAdminIdentity,
  signal?: AbortSignal,
): Promise<JiraSetupRecord> {
  const result = await sendJiraUpstreamRequest({
    method: "GET",
    path: `/api/project-setups/${setupId}`,
    responseSchema: jiraSetupRecordSchema,
    requestId,
    actor,
    signal,
    retrySafe: true,
  });

  assertOwnedByCurrentUser(result.ownerUserId, actor);
  return result;
}

export async function updateJiraSetup(
  setupId: string,
  request: JiraProjectSetupRequest,
  requestId: string,
  actor: JiraAdminIdentity,
): Promise<JiraSetupRecord> {
  const body = jiraProjectSetupRequestSchema.parse(request);

  await getJiraSetup(setupId, requestId, actor);

  const result = await sendJiraUpstreamRequest({
    method: "PUT",
    path: `/api/project-setups/${setupId}`,
    responseSchema: jiraSetupRecordSchema,
    body,
    requestId,
    actor,
  });

  assertOwnedByCurrentUser(result.ownerUserId, actor);
  return result;
}

export async function startJiraSetupRun(
  setupId: string,
  requestId: string,
  actor: JiraAdminIdentity,
): Promise<JiraRunRecord> {
  await getJiraSetup(setupId, requestId, actor);

  const result = await sendJiraUpstreamRequest({
    method: "POST",
    path: `/api/project-setups/${setupId}/runs`,
    responseSchema: jiraRunRecordSchema,
    requestId,
    actor,
  });

  assertOwnedByCurrentUser(result.ownerUserId, actor);
  return result;
}

export async function getJiraRun(
  runId: string,
  requestId: string,
  actor: JiraAdminIdentity,
  signal?: AbortSignal,
): Promise<JiraRunRecord> {
  const result = await sendJiraUpstreamRequest({
    method: "GET",
    path: `/api/runs/${runId}`,
    responseSchema: jiraRunRecordSchema,
    requestId,
    actor,
    signal,
    retrySafe: true,
  });

  assertOwnedByCurrentUser(result.ownerUserId, actor);
  return result;
}

export async function getJiraRunReport(
  runId: string,
  requestId: string,
  actor: JiraAdminIdentity,
  signal?: AbortSignal,
): Promise<string> {
  await getJiraRun(runId, requestId, actor, signal);

  return sendJiraUpstreamRequest({
    method: "GET",
    path: `/api/runs/${runId}/report`,
    responseSchema: jiraReportSchema,
    requestId,
    actor,
    signal,
    retrySafe: true,
    responseType: "text",
  });
}

export async function getJiraProjectSummaryView(
  projectKey: string,
  requestId: string,
  actor: JiraAdminIdentity,
  signal?: AbortSignal,
): Promise<ProjectSummaryView> {
  return sendJiraUpstreamRequest({
    method: "GET",
    path: `/api/workspaces/${encodeURIComponent(projectKey)}/summary`,
    responseSchema: projectSummaryViewSchema,
    requestId,
    actor,
    signal,
    retrySafe: true,
  });
}

export type JiraWorkQueueRequest = {
  statusSlug?: WorkStatusSlug;
  taskTypeSlug?: TaskTypeSlug;
  search?: string;
  sort?: string;
};

export async function getJiraWorkQueueView(
  projectKey: string,
  query: JiraWorkQueueRequest,
  requestId: string,
  actor: JiraAdminIdentity,
  signal?: AbortSignal,
): Promise<WorkQueueView> {
  const params = new URLSearchParams();
  if (query.statusSlug) params.set("status", query.statusSlug);
  if (query.taskTypeSlug) params.set("taskType", query.taskTypeSlug);
  if (query.search) params.set("search", query.search);
  if (query.sort) params.set("sort", query.sort);

  const queryString = params.toString();
  return sendJiraUpstreamRequest({
    method: "GET",
    path: `/api/workspaces/${encodeURIComponent(projectKey)}/work${queryString ? `?${queryString}` : ""}`,
    responseSchema: workQueueViewSchema,
    requestId,
    actor,
    signal,
    retrySafe: true,
  });
}

export async function getJiraSubtaskQuestionView(
  projectKey: string,
  issueIdOrKey: string,
  requestId: string,
  actor: JiraAdminIdentity,
  signal?: AbortSignal,
): Promise<SubtaskQuestionView> {
  return sendJiraUpstreamRequest({
    method: "GET",
    path: `/api/workspaces/${encodeURIComponent(projectKey)}/questions/${encodeURIComponent(issueIdOrKey)}`,
    responseSchema: subtaskQuestionViewSchema,
    requestId,
    actor,
    signal,
    retrySafe: true,
  });
}

export async function saveJiraAnswerDraft(
  projectKey: string,
  issueIdOrKey: string,
  input: AnswerSaveRequest,
  requestId: string,
  actor: JiraAdminIdentity,
) {
  return sendJiraUpstreamRequest({
    method: "PUT",
    path: `/api/workspaces/${encodeURIComponent(projectKey)}/answers/${encodeURIComponent(issueIdOrKey)}`,
    responseSchema: answerViewSchema,
    body: input,
    requestId,
    actor,
  });
}

export async function validateJiraAnswerDraft(
  projectKey: string,
  issueIdOrKey: string,
  input: AnswerValidationRequest,
  requestId: string,
  actor: JiraAdminIdentity,
) {
  return sendJiraUpstreamRequest({
    method: "POST",
    path: `/api/workspaces/${encodeURIComponent(projectKey)}/answers/${encodeURIComponent(issueIdOrKey)}/validate`,
    responseSchema: answerViewSchema,
    body: input,
    requestId,
    actor,
  });
}

export async function completeJiraAnswer(
  projectKey: string,
  issueIdOrKey: string,
  input: AnswerCompletionRequest,
  requestId: string,
  actor: JiraAdminIdentity,
) {
  return sendJiraUpstreamRequest({
    method: "POST",
    path: `/api/workspaces/${encodeURIComponent(projectKey)}/answers/${encodeURIComponent(issueIdOrKey)}/complete`,
    responseSchema: answerViewSchema,
    body: input,
    requestId,
    actor,
  });
}
