"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  answerCompletionRequestSchema,
  answerSaveRequestSchema,
  answerValidationRequestSchema,
} from "@/app/admin/dashboard/jira/_schemas";
import type { AnswerView, ApiFailure, ApiResult } from "@/app/admin/dashboard/jira/_types";
import { requireJiraAdmin, type JiraAdminIdentity } from "@/app/api/jira/_lib/auth";
import { normalizeUnknownError, validationErrorFromZod } from "@/app/api/jira/_lib/errors";
import {
  enforceJiraRateLimit,
  type JiraRateLimitPolicyName,
} from "@/app/api/jira/_lib/rate-limit";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import {
  completeJiraAnswer,
  saveJiraAnswerDraft,
  validateJiraAnswerDraft,
} from "@/app/api/jira/_lib/service";

const answerIdentitySchema = z.object({
  projectKey: z.string().trim().min(1),
  issueIdOrKey: z.string().trim().min(1),
});

const saveWorkAnswerActionSchema = answerIdentitySchema.merge(answerSaveRequestSchema);
const validateWorkAnswerActionSchema = answerIdentitySchema.merge(
  answerValidationRequestSchema,
);
const completeWorkAnswerActionSchema = answerIdentitySchema.merge(
  answerCompletionRequestSchema,
);

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

async function runJiraWorkAction<T>(
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

function revalidateProjectWork(projectKey: string): void {
  const path = `/admin/dashboard/jira/${encodeURIComponent(projectKey)}`;
  revalidatePath(path);
  revalidatePath(`${path}/work`);
}

export async function saveWorkAnswerAction(
  input: unknown,
): Promise<ApiResult<AnswerView>> {
  return runJiraWorkAction("mutation", async (actor, requestId) => {
    const parsed = saveWorkAnswerActionSchema.safeParse(input);
    if (!parsed.success) {
      throw validationErrorFromZod(parsed.error);
    }

    const { projectKey, issueIdOrKey, ...body } = parsed.data;
    const answer = await saveJiraAnswerDraft(
      projectKey,
      issueIdOrKey,
      body,
      requestId,
      actor,
    );
    revalidateProjectWork(projectKey);
    return answer;
  });
}

export async function validateWorkAnswerAction(
  input: unknown,
): Promise<ApiResult<AnswerView>> {
  return runJiraWorkAction("mutation", async (actor, requestId) => {
    const parsed = validateWorkAnswerActionSchema.safeParse(input);
    if (!parsed.success) {
      throw validationErrorFromZod(parsed.error);
    }

    const { projectKey, issueIdOrKey, ...body } = parsed.data;
    const answer = await validateJiraAnswerDraft(
      projectKey,
      issueIdOrKey,
      body,
      requestId,
      actor,
    );
    revalidateProjectWork(projectKey);
    return answer;
  });
}

export async function completeWorkAnswerAction(
  input: unknown,
): Promise<ApiResult<AnswerView>> {
  return runJiraWorkAction("mutation", async (actor, requestId) => {
    const parsed = completeWorkAnswerActionSchema.safeParse(input);
    if (!parsed.success) {
      throw validationErrorFromZod(parsed.error);
    }

    const { projectKey, issueIdOrKey, ...body } = parsed.data;
    const answer = await completeJiraAnswer(
      projectKey,
      issueIdOrKey,
      body,
      requestId,
      actor,
    );
    revalidateProjectWork(projectKey);
    return answer;
  });
}
