import {
  createCipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import dotenv from "dotenv";

dotenv.config();

const ALGORITHM = "aes-256-gcm";
const ENVELOPE_VERSION = "v1";
const IV_BYTES = 12;
const KEY_BYTES = 32;

const args = parseArgs(process.argv.slice(2));
const required = ["user-id", "site-url", "email", "api-token", "account-id"];
const missing = required.filter((name) => !args[name]);

if (missing.length > 0) {
  throw new Error(`Missing required argument(s): ${missing.map((name) => `--${name}`).join(", ")}`);
}

const siteUrl = normalizeJiraSiteUrl(args["site-url"]);
const email = args.email.trim();
const apiToken = args["api-token"].trim();
const displayName = args["display-name"]?.trim() ?? "";

const set = {
  siteUrlEncrypted: encrypt(siteUrl),
  siteUrlHash: hash(siteUrl),
  emailEncrypted: encrypt(email),
  emailHash: hash(email.toLowerCase()),
  apiTokenEncrypted: encrypt(apiToken),
  apiTokenHash: hash(apiToken),
  apiTokenFingerprint: fingerprint(apiToken),
  accountId: args["account-id"].trim(),
  displayName,
  verifiedAt: "new Date()",
};

console.log("db.jira_credentials.updateOne(");
console.log(`  { user: ObjectId(${JSON.stringify(args["user-id"].trim())}) },`);
console.log("  {");
console.log("    $set: {");
for (const [key, value] of Object.entries(set)) {
  const rendered = value === "new Date()" ? value : JSON.stringify(value);
  console.log(`      ${key}: ${rendered},`);
}
console.log("    },");
console.log(`    $setOnInsert: { user: ObjectId(${JSON.stringify(args["user-id"].trim())}) },`);
console.log("  },");
console.log("  { upsert: true }");
console.log(")");

function encrypt(value) {
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

function hash(value) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function fingerprint(value) {
  const hashed = hash(value);
  return `${hashed.slice(0, 12)}:${hashed.slice(-8)}`;
}

function getCredentialEncryptionKey() {
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

function normalizeJiraSiteUrl(value) {
  const parsed = new URL(value.trim());
  if (parsed.protocol !== "https:") {
    throw new Error("Jira site URL must use HTTPS.");
  }
  return parsed.origin;
}

function parseArgs(argv) {
  const parsed = {};
  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const separator = arg.indexOf("=");
    if (separator === -1) {
      parsed[arg.slice(2)] = "";
    } else {
      parsed[arg.slice(2, separator)] = arg.slice(separator + 1);
    }
  }
  return parsed;
}
