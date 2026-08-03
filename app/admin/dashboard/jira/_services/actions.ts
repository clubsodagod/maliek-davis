"use server";

import { revalidatePath } from "next/cache";
import {
  jiraCredentialInputSchema,
  jiraProjectSetupRequestSchema,
  startJiraSetupRunActionSchema,
  updateJiraSetupActionSchema,
} from "@/app/admin/dashboard/jira/_schemas";
import type {
  ApiFailure,
  ApiResult,
  JiraCredentialStatus,
  JiraRunRecord,
  JiraSetupRecord,
  JiraValidationResult,
} from "@/app/admin/dashboard/jira/_types";
import { requireJiraAdmin, type JiraAdminIdentity } from "@/app/api/jira/_lib/auth";
import { normalizeUnknownError, validationErrorFromZod } from "@/app/api/jira/_lib/errors";
import {
  getJiraCredentialStatus,
  saveJiraCredential,
} from "@/app/api/jira/_lib/user-credentials";
import {
  enforceJiraRateLimit,
  type JiraRateLimitPolicyName,
} from "@/app/api/jira/_lib/rate-limit";
import { createRequestId, logJiraFailure } from "@/app/api/jira/_lib/responses";
import {
  createJiraSetup,
  startJiraSetupRun,
  updateJiraSetup,
  validateJiraSetup,
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

async function runJiraAction<T>(
  policyName: JiraRateLimitPolicyName,
  operation: (actor: JiraAdminIdentity, requestId: string) => Promise<T>,
): Promise<ApiResult<T>> {
  const requestId = createRequestId();

  try {
    const actor = await requireJiraAdmin();
    enforceJiraRateLimit(actor.userId, policyName);

    const data = await operation(actor, requestId);
    return {
      success: true,
      data,
      requestId,
    };
  } catch (error) {
    logJiraFailure(error, requestId);
    return actionFailure(error, requestId);
  }
}

/**
 * Validates setup data through the Jira automation server.
 *
 * @param input - Untrusted project setup input from a form or upload flow.
 * @returns A serializable application response envelope.
 */
export async function validateJiraSetupAction(
  input: unknown,
): Promise<ApiResult<JiraValidationResult>> {
  return runJiraAction("validate", async (actor, requestId) => {
    const parsed = jiraProjectSetupRequestSchema.safeParse(input);

    if (!parsed.success) {
      throw validationErrorFromZod(parsed.error);
    }

    return validateJiraSetup(parsed.data, requestId, actor);
  });
}

/**
 * Reads the current admin's Jira credential readiness without returning secrets.
 *
 * @returns A serializable credential status for protected Jira dashboard UI.
 */
export async function getJiraCredentialStatusAction(): Promise<ApiResult<JiraCredentialStatus>> {
  return runJiraAction("read", async (actor) => {
    return getJiraCredentialStatus(actor);
  });
}

/**
 * Verifies and stores Jira credentials for the current admin.
 *
 * @param input - Untrusted Jira credential form input.
 * @returns The updated credential status after successful verification.
 */
export async function saveJiraCredentialAction(
  input: unknown,
): Promise<ApiResult<JiraCredentialStatus>> {
  return runJiraAction("mutation", async (actor, requestId) => {
    const parsed = jiraCredentialInputSchema.safeParse(input);

    if (!parsed.success) {
      throw validationErrorFromZod(parsed.error);
    }

    return saveJiraCredential(actor, parsed.data, requestId);
  });
}

/**
 * Creates a persisted Jira setup draft owned by the current admin.
 *
 * @param input - Untrusted setup request payload.
 * @returns The created setup record returned by the automation server.
 */
export async function createJiraSetupAction(
  input: unknown,
): Promise<ApiResult<JiraSetupRecord>> {
  return runJiraAction("mutation", async (actor, requestId) => {
    const parsed = jiraProjectSetupRequestSchema.safeParse(input);

    if (!parsed.success) {
      throw validationErrorFromZod(parsed.error);
    }

    const setup = await createJiraSetup(parsed.data, requestId, actor);
    revalidatePath("/admin/dashboard/jira");
    revalidatePath(`/admin/dashboard/jira/setups/${setup.id}/preview`);
    return setup;
  });
}

/**
 * Updates an owned Jira setup draft.
 *
 * @param input - The setup identifier and replacement setup request payload.
 * @returns The updated setup record.
 */
export async function updateJiraSetupAction(
  input: unknown,
): Promise<ApiResult<JiraSetupRecord>> {
  return runJiraAction("mutation", async (actor, requestId) => {
    const parsed = updateJiraSetupActionSchema.safeParse(input);

    if (!parsed.success) {
      throw validationErrorFromZod(parsed.error);
    }

    const setup = await updateJiraSetup(
      parsed.data.setupId,
      parsed.data.request,
      requestId,
      actor,
    );
    revalidatePath("/admin/dashboard/jira");
    revalidatePath(`/admin/dashboard/jira/setups/${setup.id}/preview`);
    return setup;
  });
}

/**
 * Starts execution for an owned Jira setup.
 *
 * @param input - The setup identifier for the confirmed setup run.
 * @returns The created run record.
 */
export async function startJiraSetupRunAction(
  input: unknown,
): Promise<ApiResult<JiraRunRecord>> {
  return runJiraAction("mutation", async (actor, requestId) => {
    const parsed = startJiraSetupRunActionSchema.safeParse(input);

    if (!parsed.success) {
      throw validationErrorFromZod(parsed.error);
    }

    const run = await startJiraSetupRun(parsed.data.setupId, requestId, actor);
    revalidatePath(`/admin/dashboard/jira/setups/${parsed.data.setupId}/run`);
    revalidatePath(`/admin/dashboard/jira/setups/${parsed.data.setupId}/results`);
    return run;
  });
}
