"use server";

import { revalidatePath } from "next/cache";
import {
  approveDiscoverySectionActionSchema,
  approveFinalDiscoveryActionSchema,
  chatDiscoveryPlanActionSchema,
  patchDiscoveryPlanActionSchema,
  processDiscoverySectionActionSchema,
  saveDiscoveryAnswerActionSchema,
  skipDiscoveryActionSchema,
  startDiscoveryActionSchema,
} from "@/app/admin/dashboard/jira/_schemas";
import type {
  ApiFailure,
  ApiResult,
  DiscoveryFinalApprovalResponse,
  DiscoveryResponse,
} from "@/app/admin/dashboard/jira/_types";
import { requireJiraAdmin, type JiraAdminIdentity } from "@/app/api/jira/_lib/auth";
import { normalizeUnknownError, validationErrorFromZod } from "@/app/api/jira/_lib/errors";
import {
  enforceJiraRateLimit,
  type JiraRateLimitPolicyName,
} from "@/app/api/jira/_lib/rate-limit";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import {
  approveFinalJiraDiscovery,
  approveJiraDiscoverySection,
  chatJiraDiscoveryPlan,
  generateJiraDiscoveryPlan,
  patchJiraDiscoveryPlan,
  processJiraDiscoverySection,
  saveJiraDiscoveryAnswer,
  skipJiraDiscovery,
  startJiraDiscovery,
} from "@/app/api/jira/_lib/service";

function actionFailure(error: unknown, requestId: string): ApiFailure {
  const appError = normalizeUnknownError(error);

  return {
    success: false,
    error: {
      code: appError.code,
      message: appError.message,
      fieldErrors: appError.fieldErrors,
      retryable: appError.retryable,
    },
    requestId,
  };
}

async function runDiscoveryAction<T>(
  policyName: JiraRateLimitPolicyName,
  operation: (actor: JiraAdminIdentity, requestId: string) => Promise<T>,
): Promise<ApiResult<T>> {
  const requestId = createRequestId();

  try {
    const actor = await requireJiraAdmin();
    enforceJiraRateLimit(actor.userId, policyName);

    return {
      success: true,
      data: await operation(actor, requestId),
      requestId,
    };
  } catch (error) {
    logJiraFailure(error, requestId);
    return actionFailure(error, requestId);
  }
}

export async function startJiraDiscoveryAction(
  input: unknown,
): Promise<ApiResult<DiscoveryResponse>> {
  return runDiscoveryAction("mutation", async (actor, requestId) => {
    const parsed = startDiscoveryActionSchema.safeParse(input);
    if (!parsed.success) throw validationErrorFromZod(parsed.error);
    const response = await startJiraDiscovery(parsed.data, requestId, actor);
    revalidateDiscoveryPaths(parsed.data.setupId);
    return response;
  });
}

export async function skipJiraDiscoveryAction(
  input: unknown,
): Promise<ApiResult<DiscoveryResponse>> {
  return runDiscoveryAction("mutation", async (actor, requestId) => {
    const parsed = skipDiscoveryActionSchema.safeParse(input);
    if (!parsed.success) throw validationErrorFromZod(parsed.error);
    const response = await skipJiraDiscovery(parsed.data.setupId, requestId, actor);
    revalidateDiscoveryPaths(parsed.data.setupId);
    return response;
  });
}

export async function saveJiraDiscoveryAnswerAction(
  input: unknown,
): Promise<ApiResult<DiscoveryResponse>> {
  return runDiscoveryAction("mutation", async (actor, requestId) => {
    const parsed = saveDiscoveryAnswerActionSchema.safeParse(input);
    if (!parsed.success) throw validationErrorFromZod(parsed.error);
    const response = await saveJiraDiscoveryAnswer(parsed.data, requestId, actor);
    revalidateDiscoveryPaths(parsed.data.setupId);
    return response;
  });
}

export async function processJiraDiscoverySectionAction(
  input: unknown,
): Promise<ApiResult<DiscoveryResponse>> {
  return runDiscoveryAction("mutation", async (actor, requestId) => {
    const parsed = processDiscoverySectionActionSchema.safeParse(input);
    if (!parsed.success) throw validationErrorFromZod(parsed.error);
    const response = await processJiraDiscoverySection(parsed.data, requestId, actor);
    revalidateDiscoveryPaths(parsed.data.setupId);
    return response;
  });
}

export async function approveJiraDiscoverySectionAction(
  input: unknown,
): Promise<ApiResult<DiscoveryResponse>> {
  return runDiscoveryAction("mutation", async (actor, requestId) => {
    const parsed = approveDiscoverySectionActionSchema.safeParse(input);
    if (!parsed.success) throw validationErrorFromZod(parsed.error);
    const response = await approveJiraDiscoverySection(parsed.data, requestId, actor);
    revalidateDiscoveryPaths(parsed.data.setupId);
    return response;
  });
}

export async function generateJiraDiscoveryPlanAction(
  input: unknown,
): Promise<ApiResult<DiscoveryResponse>> {
  return runDiscoveryAction("mutation", async (actor, requestId) => {
    const parsed = skipDiscoveryActionSchema.safeParse(input);
    if (!parsed.success) throw validationErrorFromZod(parsed.error);
    const response = await generateJiraDiscoveryPlan(parsed.data.setupId, requestId, actor);
    revalidateDiscoveryPaths(parsed.data.setupId);
    return response;
  });
}

export async function patchJiraDiscoveryPlanAction(
  input: unknown,
): Promise<ApiResult<DiscoveryResponse>> {
  return runDiscoveryAction("mutation", async (actor, requestId) => {
    const parsed = patchDiscoveryPlanActionSchema.safeParse(input);
    if (!parsed.success) throw validationErrorFromZod(parsed.error);
    const response = await patchJiraDiscoveryPlan(parsed.data, requestId, actor);
    revalidateDiscoveryPaths(parsed.data.setupId);
    return response;
  });
}

export async function chatJiraDiscoveryPlanAction(
  input: unknown,
): Promise<ApiResult<DiscoveryResponse>> {
  return runDiscoveryAction("mutation", async (actor, requestId) => {
    const parsed = chatDiscoveryPlanActionSchema.safeParse(input);
    if (!parsed.success) throw validationErrorFromZod(parsed.error);
    const response = await chatJiraDiscoveryPlan(parsed.data, requestId, actor);
    revalidateDiscoveryPaths(parsed.data.setupId);
    return response;
  });
}

export async function approveFinalJiraDiscoveryAction(
  input: unknown,
): Promise<ApiResult<DiscoveryFinalApprovalResponse>> {
  return runDiscoveryAction("mutation", async (actor, requestId) => {
    const parsed = approveFinalDiscoveryActionSchema.safeParse(input);
    if (!parsed.success) throw validationErrorFromZod(parsed.error);
    const response = await approveFinalJiraDiscovery(parsed.data, requestId, actor);
    revalidateDiscoveryPaths(parsed.data.setupId);
    revalidatePath(`/admin/dashboard/jira/setups/${parsed.data.setupId}/preview`);
    return response;
  });
}

function revalidateDiscoveryPaths(setupId: string): void {
  revalidatePath("/admin/dashboard/jira");
  revalidatePath(`/admin/dashboard/jira/setups/${setupId}/discovery`);
}
