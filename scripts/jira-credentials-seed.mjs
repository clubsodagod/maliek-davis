import dotenv from "dotenv";
import mongoose, { Schema } from "mongoose";

dotenv.config();

const dryRun = process.argv.includes("--dry-run");
const mongoUri = process.env.MONGODB_URI?.trim();

if (!mongoUri) {
  throw new Error("Missing required environment variable: MONGODB_URI");
}

const User =
  mongoose.models.User ||
  mongoose.model("User", new Schema({}, { strict: false }), "users");

const JiraCredential =
  mongoose.models.JiraCredential ||
  mongoose.model(
    "JiraCredential",
    new Schema(
      {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        siteUrlEncrypted: { type: String, default: "" },
        siteUrlHash: { type: String, default: "" },
        emailEncrypted: { type: String, default: "" },
        emailHash: { type: String, default: "" },
        apiTokenEncrypted: { type: String, default: "" },
        apiTokenHash: { type: String, default: "" },
        apiTokenFingerprint: { type: String, default: "" },
        accountId: { type: String, default: "" },
        displayName: { type: String, default: "" },
        verifiedAt: { type: Date },
      },
      { timestamps: true, collection: "jira_credentials" },
    ),
  );

await mongoose.connect(mongoUri);

try {
  const users = await User.find({}, { _id: 1 }).lean();
  const userIds = users.map((user) => user._id);
  const existing = await JiraCredential.find(
    { user: { $in: userIds } },
    { user: 1 },
  ).lean();
  const existingUserIds = new Set(existing.map((credential) => String(credential.user)));
  const missingUserIds = userIds.filter((userId) => !existingUserIds.has(String(userId)));

  if (dryRun) {
    console.log(`Users scanned: ${userIds.length}`);
    console.log(`Blank Jira credential records to create: ${missingUserIds.length}`);
    process.exitCode = 0;
  } else if (missingUserIds.length === 0) {
    console.log("All users already have Jira credential records.");
  } else {
    await JiraCredential.bulkWrite(
      missingUserIds.map((userId) => ({
        updateOne: {
          filter: { user: userId },
          update: {
            $setOnInsert: {
              user: userId,
              siteUrlEncrypted: "",
              siteUrlHash: "",
              emailEncrypted: "",
              emailHash: "",
              apiTokenEncrypted: "",
              apiTokenHash: "",
              apiTokenFingerprint: "",
              accountId: "",
              displayName: "",
            },
          },
          upsert: true,
        },
      })),
      { ordered: false },
    );
    console.log(`Created ${missingUserIds.length} blank Jira credential records.`);
  }
} finally {
  await mongoose.disconnect();
}
