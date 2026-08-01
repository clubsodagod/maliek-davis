import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { JiraAdminIdentity } from "./auth";
import { requireJiraAdmin } from "./auth";
import { JiraAppError, validationErrorFromZod } from "./errors";
import { enforceJiraRateLimit, type JiraRateLimitPolicyName } from "./rate-limit";
import {
  apiFailure,
  apiSuccess,
  createRequestId,
  logJiraFailure,
} from "./responses";

const MAX_JSON_BODY_BYTES = 1_000_000;

type RouteOperation<T> = (
  actor: JiraAdminIdentity,
  requestId: string,
) => Promise<T>;

export async function runProtectedJiraRoute<T>(
  policyName: JiraRateLimitPolicyName,
  operation: RouteOperation<T>,
  successStatus = 200,
): Promise<NextResponse> {
  const requestId = createRequestId();

  try {
    const actor = await requireJiraAdmin();
    enforceJiraRateLimit(actor.userId, policyName);

    const data = await operation(actor, requestId);
    return apiSuccess(data, requestId, successStatus);
  } catch (error) {
    logJiraFailure(error, requestId);
    return apiFailure(error, requestId);
  }
}

export function validateRouteParams<T>(
  schema: z.ZodType<T>,
  params: unknown,
): T {
  const parsed = schema.safeParse(params);

  if (!parsed.success) {
    throw validationErrorFromZod(parsed.error);
  }

  return parsed.data;
}

export async function readJsonBody<T>(
  request: NextRequest,
  schema: z.ZodType<T>,
): Promise<T> {
  const contentLength = request.headers.get("content-length");

  if (contentLength && Number(contentLength) > MAX_JSON_BODY_BYTES) {
    throw new JiraAppError("PAYLOAD_TOO_LARGE", "Jira request body is too large.");
  }

  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    throw new JiraAppError("BAD_REQUEST", "Request body must be valid JSON.");
  }

  const parsed = schema.safeParse(rawBody);

  if (!parsed.success) {
    throw validationErrorFromZod(parsed.error);
  }

  return parsed.data;
}
