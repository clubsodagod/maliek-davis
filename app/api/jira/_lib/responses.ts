import { NextResponse } from "next/server";
import type { ApiFailure, ApiSuccess } from "@/app/admin/dashboard/jira/_types";
import { JiraAppError, normalizeUnknownError, redactSensitiveText } from "./errors";

export function createRequestId(): string {
  return crypto.randomUUID();
}

export function apiSuccess<T>(
  data: T,
  requestId: string,
  status = 200,
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      requestId,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export function apiFailure(
  error: unknown,
  requestId: string,
): NextResponse<ApiFailure> {
  const appError = normalizeUnknownError(error);
  const headers = new Headers({
    "Cache-Control": "no-store",
  });

  if (appError.retryAfterSeconds) {
    headers.set("Retry-After", String(appError.retryAfterSeconds));
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: appError.code,
        message: appError.message,
        fieldErrors: appError.fieldErrors,
        retryable: appError.retryable,
      },
      requestId,
    },
    {
      status: appError.status,
      headers,
    },
  );
}

export function logJiraFailure(error: unknown, requestId: string): void {
  const appError =
    error instanceof JiraAppError ? error : normalizeUnknownError(error);
  const safeMessage = redactSensitiveText(appError.message);

  console.error("[Jira API]", {
    requestId,
    code: appError.code,
    status: appError.status,
    message: safeMessage,
  });
}
