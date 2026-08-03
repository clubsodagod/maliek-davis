import { afterEach, describe, expect, it, vi } from "vitest";
import {
  decryptJiraCredentialValue,
  encryptJiraCredentialValue,
  fingerprintJiraCredentialValue,
  hashJiraCredentialValue,
} from "@/app/api/jira/_lib/credential-crypto";

describe("Jira credential crypto", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("encrypts recoverable credential values", () => {
    vi.stubEnv(
      "JIRA_CREDENTIAL_ENCRYPTION_KEY",
      Buffer.from("12345678901234567890123456789012").toString("base64"),
    );

    const encrypted = encryptJiraCredentialValue("jira-token-value");

    expect(encrypted).not.toContain("jira-token-value");
    expect(decryptJiraCredentialValue(encrypted)).toBe("jira-token-value");
  });

  it("creates deterministic hashes and short fingerprints", () => {
    const hash = hashJiraCredentialValue("jira-token-value");

    expect(hash).toBe(hashJiraCredentialValue("jira-token-value"));
    expect(hash).toHaveLength(64);
    expect(fingerprintJiraCredentialValue("jira-token-value")).toMatch(/^[a-f0-9]{12}:[a-f0-9]{8}$/);
  });
});
