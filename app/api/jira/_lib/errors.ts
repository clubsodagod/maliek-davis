import { ZodError } from "zod";

export type JiraErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHENTICATED"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "PAYLOAD_TOO_LARGE"
  | "VALIDATION_FAILED"
  | "RATE_LIMITED"
  | "UPSTREAM_AUTH_FAILED"
  | "UPSTREAM_UNAVAILABLE"
  | "UPSTREAM_TIMEOUT"
  | "UPSTREAM_INVALID_RESPONSE"
  | "INTERNAL_ERROR";

const ERROR_STATUS: Record<JiraErrorCode, number> = {
  BAD_REQUEST: 400,
  UNAUTHENTICATED: 401,
  UNAUTHORIZED: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  PAYLOAD_TOO_LARGE: 413,
  VALIDATION_FAILED: 422,
  RATE_LIMITED: 429,
  UPSTREAM_AUTH_FAILED: 502,
  UPSTREAM_UNAVAILABLE: 503,
  UPSTREAM_TIMEOUT: 504,
  UPSTREAM_INVALID_RESPONSE: 502,
  INTERNAL_ERROR: 500,
};

const RETRYABLE_CODES = new Set<JiraErrorCode>([
  "RATE_LIMITED",
  "UPSTREAM_UNAVAILABLE",
  "UPSTREAM_TIMEOUT",
]);

export class JiraAppError extends Error {
  readonly code: JiraErrorCode;
  readonly status: number;
  readonly retryable: boolean;
  readonly fieldErrors?: Record<string, string[]>;
  readonly retryAfterSeconds?: number;

  constructor(
    code: JiraErrorCode,
    message: string,
    options: {
      status?: number;
      retryable?: boolean;
      fieldErrors?: Record<string, string[]>;
      retryAfterSeconds?: number;
    } = {},
  ) {
    super(message);
    this.name = "JiraAppError";
    this.code = code;
    this.status = options.status ?? ERROR_STATUS[code];
    this.retryable = options.retryable ?? RETRYABLE_CODES.has(code);
    this.fieldErrors = options.fieldErrors;
    this.retryAfterSeconds = options.retryAfterSeconds;
  }
}

export function validationErrorFromZod(error: ZodError): JiraAppError {
  const flattened = error.flatten();

  return new JiraAppError("VALIDATION_FAILED", "Invalid Jira request data.", {
    fieldErrors: flattened.fieldErrors,
  });
}

export function normalizeUnknownError(error: unknown): JiraAppError {
  if (error instanceof JiraAppError) {
    return error;
  }

  if (error instanceof ZodError) {
    return validationErrorFromZod(error);
  }

  if (error instanceof Error && error.name === "AbortError") {
    return new JiraAppError("UPSTREAM_TIMEOUT", "Jira automation server timed out.");
  }

  return new JiraAppError("INTERNAL_ERROR", "Unexpected Jira API error.");
}

export function redactSensitiveText(value: string): string {
  return value
    .replace(
      /(Authorization\s*:\s*Bearer\s+)[A-Za-z0-9._~+/=-]+/gi,
      "$1[redacted]",
    )
    .replace(/(Bearer\s+)[A-Za-z0-9._~+/=-]+/gi, "$1[redacted]")
    .replace(/(token\s*[:=]\s*)[A-Za-z0-9._~+/=-]+/gi, "$1[redacted]");
}
