import { describe, expect, it } from "vitest";
import {
  createMemoryJiraRateLimiter,
  enforceJiraRateLimit,
} from "@/app/api/jira/_lib/rate-limit";
import { JiraAppError } from "@/app/api/jira/_lib/errors";

describe("Jira rate limiter", () => {
  it("returns retry-after information when a policy is exceeded", () => {
    let now = 1_000;
    const limiter = createMemoryJiraRateLimiter(() => now);

    for (let i = 0; i < 10; i += 1) {
      enforceJiraRateLimit("user-1", "mutation", limiter);
    }

    expect(() =>
      enforceJiraRateLimit("user-1", "mutation", limiter),
    ).toThrow(JiraAppError);

    try {
      enforceJiraRateLimit("user-1", "mutation", limiter);
    } catch (error) {
      expect(error).toBeInstanceOf(JiraAppError);
      expect((error as JiraAppError).code).toBe("RATE_LIMITED");
      expect((error as JiraAppError).retryAfterSeconds).toBe(60);
    }

    now = 61_001;
    expect(() =>
      enforceJiraRateLimit("user-1", "mutation", limiter),
    ).not.toThrow();
  });
});
