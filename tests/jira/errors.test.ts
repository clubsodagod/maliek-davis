import { describe, expect, it } from "vitest";
import { redactSensitiveText } from "@/app/api/jira/_lib/errors";

describe("Jira error helpers", () => {
  it("redacts bearer tokens from logged text", () => {
    expect(redactSensitiveText("Authorization: Bearer secret-token")).toBe(
      "Authorization: Bearer [redacted]",
    );
  });
});
