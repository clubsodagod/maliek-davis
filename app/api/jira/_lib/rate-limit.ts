import { JiraAppError } from "./errors";

export type JiraRateLimitPolicyName = "read" | "validate" | "mutation";

type RateLimitPolicy = {
  limit: number;
  windowMs: number;
};

const POLICIES: Record<JiraRateLimitPolicyName, RateLimitPolicy> = {
  read: { limit: 120, windowMs: 60_000 },
  validate: { limit: 30, windowMs: 60_000 },
  mutation: { limit: 10, windowMs: 60_000 },
};

type Bucket = {
  count: number;
  resetAt: number;
};

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

export type JiraRateLimiter = {
  check(identity: string, policyName: JiraRateLimitPolicyName): RateLimitResult;
  reset(): void;
};

export function createMemoryJiraRateLimiter(
  now: () => number = () => Date.now(),
): JiraRateLimiter {
  const buckets = new Map<string, Bucket>();

  return {
    check(identity, policyName) {
      const policy = POLICIES[policyName];
      const key = `${policyName}:${identity}`;
      const current = now();
      const bucket = buckets.get(key);

      if (!bucket || current >= bucket.resetAt) {
        buckets.set(key, {
          count: 1,
          resetAt: current + policy.windowMs,
        });
        return { allowed: true };
      }

      if (bucket.count >= policy.limit) {
        return {
          allowed: false,
          retryAfterSeconds: Math.max(
            1,
            Math.ceil((bucket.resetAt - current) / 1000),
          ),
        };
      }

      bucket.count += 1;
      return { allowed: true };
    },
    reset() {
      buckets.clear();
    },
  };
}

export const jiraRateLimiter = createMemoryJiraRateLimiter();

/**
 * Applies v1 per-process Jira rate limits.
 *
 * This is intentionally isolated so a distributed limiter can replace it when
 * the app runs across multiple serverless instances.
 */
export function enforceJiraRateLimit(
  identity: string,
  policyName: JiraRateLimitPolicyName,
  limiter: JiraRateLimiter = jiraRateLimiter,
): void {
  const result = limiter.check(identity, policyName);

  if (!result.allowed) {
    throw new JiraAppError("RATE_LIMITED", "Too many Jira requests.", {
      retryAfterSeconds: result.retryAfterSeconds,
    });
  }
}
