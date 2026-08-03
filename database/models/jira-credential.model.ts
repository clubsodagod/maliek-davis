import mongoose, { Schema, Document } from "mongoose";

export interface IJiraCredential extends Document {
    user: mongoose.Types.ObjectId;
    siteUrlEncrypted: string;
    siteUrlHash: string;
    emailEncrypted: string;
    emailHash: string;
    apiTokenEncrypted: string;
    apiTokenHash: string;
    apiTokenFingerprint: string;
    accountId: string;
    displayName: string;
    verifiedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const JiraCredentialSchema = new Schema<IJiraCredential>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },
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
    {
        timestamps: true,
        collection: "jira_credentials",
    },
);

const JiraCredentialModel =
    mongoose.models.JiraCredential ||
    mongoose.model<IJiraCredential>("JiraCredential", JiraCredentialSchema);

export default JiraCredentialModel;
