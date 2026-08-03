import mongoose from "mongoose";
import connectToDB from "@/database/connect-to-db.database";
import JiraCredentialModel, {
  type IJiraCredential,
} from "@/database/models/jira-credential.model";
import {
  jiraCredentialVerificationSchema,
} from "@/app/admin/dashboard/jira/_schemas";
import type {
  JiraCredentialSaveInput,
  JiraCredentialStatus,
  JiraCredentialVerification,
} from "@/app/admin/dashboard/jira/_types";
import type { JiraAdminIdentity } from "./auth";
import {
  decryptJiraCredentialValue,
  encryptJiraCredentialValue,
  fingerprintJiraCredentialValue,
  hashJiraCredentialValue,
} from "./credential-crypto";
import { JiraAppError } from "./errors";
import { sendJiraUpstreamRequest } from "./upstream-client";
import type { JiraUpstreamCredential } from "./upstream-client";

type JiraCredentialDocument = IJiraCredential & {
  verifiedAt?: Date;
};

const CREDENTIAL_REQUIRED_MESSAGE =
  "Add your Jira credentials before running Jira automation.";

/**
 * Returns non-secret Jira credential readiness for the protected admin UI.
 */
export async function getJiraCredentialStatus(
  actor: JiraAdminIdentity,
): Promise<JiraCredentialStatus> {
  await connectToDB();
  const credential = await JiraCredentialModel.findOne({
    user: toUserObjectId(actor.userId),
  });

  return toCredentialStatus(credential);
}

/**
 * Decrypts the current admin's Jira credential for server-to-server requests.
 *
 * @throws JiraAppError when the credential record is missing or incomplete.
 */
export async function getRequiredJiraCredential(
  actor: JiraAdminIdentity,
): Promise<JiraUpstreamCredential> {
  await connectToDB();
  const credential = await JiraCredentialModel.findOne({
    user: toUserObjectId(actor.userId),
  });
  const status = toCredentialStatus(credential);

  if (!status.configured || credential === null) {
    throw new JiraAppError("JIRA_CREDENTIAL_REQUIRED", CREDENTIAL_REQUIRED_MESSAGE, {
      fieldErrors: Object.fromEntries(
        status.missingFields.map((field) => [field, ["Required"]]),
      ),
    });
  }

  return {
    baseUrl: decryptJiraCredentialValue(credential.siteUrlEncrypted),
    email: decryptJiraCredentialValue(credential.emailEncrypted),
    apiToken: decryptJiraCredentialValue(credential.apiTokenEncrypted),
  };
}

/**
 * Verifies a Jira credential with the automation server before encrypting it in MongoDB.
 */
export async function saveJiraCredential(
  actor: JiraAdminIdentity,
  input: JiraCredentialSaveInput,
  requestId: string,
): Promise<JiraCredentialStatus> {
  const normalized = normalizeCredentialInput(input);
  const verification = await verifyJiraCredential(actor, normalized, requestId);
  await connectToDB();

  await JiraCredentialModel.updateOne(
    { user: toUserObjectId(actor.userId) },
    {
      $set: {
        siteUrlEncrypted: encryptJiraCredentialValue(normalized.baseUrl),
        siteUrlHash: hashJiraCredentialValue(normalized.baseUrl),
        emailEncrypted: encryptJiraCredentialValue(normalized.email),
        emailHash: hashJiraCredentialValue(normalized.email.toLowerCase()),
        apiTokenEncrypted: encryptJiraCredentialValue(normalized.apiToken),
        apiTokenHash: hashJiraCredentialValue(normalized.apiToken),
        apiTokenFingerprint: fingerprintJiraCredentialValue(normalized.apiToken),
        accountId: verification.accountId,
        displayName: verification.displayName ?? "",
        verifiedAt: new Date(),
      },
      $setOnInsert: {
        user: toUserObjectId(actor.userId),
      },
    },
    { upsert: true },
  );

  return getJiraCredentialStatus(actor);
}

async function verifyJiraCredential(
  actor: JiraAdminIdentity,
  credential: JiraUpstreamCredential,
  requestId: string,
): Promise<JiraCredentialVerification> {
  try {
    return await sendJiraUpstreamRequest({
      method: "POST",
      path: "/api/jira-credentials/verify",
      responseSchema: jiraCredentialVerificationSchema,
      requestId,
      actor,
      jiraCredential: credential,
    });
  } catch (error) {
    if (error instanceof JiraAppError && error.code === "UPSTREAM_AUTH_FAILED") {
      throw new JiraAppError(
        "VALIDATION_FAILED",
        "Jira rejected the provided credentials.",
      );
    }

    throw error;
  }
}

function normalizeCredentialInput(input: JiraCredentialSaveInput): JiraUpstreamCredential {
  return {
    baseUrl: normalizeJiraSiteUrl(input.siteUrl),
    email: input.email.trim(),
    apiToken: input.apiToken.trim(),
  };
}

function normalizeJiraSiteUrl(value: string): string {
  let parsed: URL;
  try {
    parsed = new URL(value.trim());
  } catch {
    throw new JiraAppError("VALIDATION_FAILED", "Jira site URL must be a valid HTTPS URL.", {
      fieldErrors: {
        siteUrl: ["Enter a valid Jira site URL."],
      },
    });
  }

  if (parsed.protocol !== "https:") {
    throw new JiraAppError("VALIDATION_FAILED", "Jira site URL must use HTTPS.", {
      fieldErrors: {
        siteUrl: ["Jira site URL must use HTTPS."],
      },
    });
  }

  return parsed.origin;
}

function toCredentialStatus(
  credential: JiraCredentialDocument | null,
): JiraCredentialStatus {
  const missingFields: JiraCredentialStatus["missingFields"] = [];

  if (!credential?.siteUrlEncrypted) missingFields.push("siteUrl");
  if (!credential?.emailEncrypted) missingFields.push("email");
  if (!credential?.apiTokenEncrypted) missingFields.push("apiToken");
  if (!credential?.accountId) missingFields.push("accountId");

  return {
    configured: missingFields.length === 0,
    missingFields,
    ...(credential?.accountId ? { accountId: credential.accountId } : {}),
    ...(credential?.displayName ? { displayName: credential.displayName } : {}),
    ...(credential?.verifiedAt ? { verifiedAt: credential.verifiedAt.toISOString() } : {}),
  };
}

function toUserObjectId(userId: string): mongoose.Types.ObjectId {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new JiraAppError("UNAUTHORIZED", "Invalid admin user.");
  }

  return new mongoose.Types.ObjectId(userId);
}
