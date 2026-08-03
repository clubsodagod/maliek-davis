import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const ENVELOPE_VERSION = "v1";
const IV_BYTES = 12;
const KEY_BYTES = 32;

export function encryptJiraCredentialValue(value: string): string {
  const key = getCredentialEncryptionKey();
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const ciphertext = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return [
    ENVELOPE_VERSION,
    iv.toString("base64"),
    tag.toString("base64"),
    ciphertext.toString("base64"),
  ].join(":");
}

export function decryptJiraCredentialValue(envelope: string): string {
  if (envelope.trim() === "") return "";

  const [version, ivText, tagText, ciphertextText] = envelope.split(":");
  if (
    version !== ENVELOPE_VERSION ||
    !ivText ||
    !tagText ||
    !ciphertextText
  ) {
    throw new Error("Invalid Jira credential ciphertext.");
  }

  const key = getCredentialEncryptionKey();
  const decipher = createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(ivText, "base64"),
  );
  decipher.setAuthTag(Buffer.from(tagText, "base64"));

  return Buffer.concat([
    decipher.update(Buffer.from(ciphertextText, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

export function hashJiraCredentialValue(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function fingerprintJiraCredentialValue(value: string): string {
  const hash = hashJiraCredentialValue(value);
  return `${hash.slice(0, 12)}:${hash.slice(-8)}`;
}

function getCredentialEncryptionKey(): Buffer {
  const rawKey = process.env.JIRA_CREDENTIAL_ENCRYPTION_KEY?.trim();
  if (!rawKey) {
    throw new Error("Missing required environment variable: JIRA_CREDENTIAL_ENCRYPTION_KEY");
  }

  const key = Buffer.from(rawKey, "base64");
  if (key.length !== KEY_BYTES) {
    throw new Error("Invalid JIRA_CREDENTIAL_ENCRYPTION_KEY. Expected a 32-byte base64 value.");
  }

  return key;
}
