// /database/models/audit-lead.model.ts
import { Schema, model, models, Document } from "mongoose";

export const PLATFORMS = [
    "Instagram",
    "Facebook",
    "TikTok",
    "LinkedIn",
    "YouTube",
    "Email",
    "Website",
    "Other",
] as const;

export const GOALS = [
    "More inbound leads",
    "Consistent posting",
    "Faster follow-up",
    "Client onboarding automation",
    "Reporting/analytics",
    "Reduce manual work",
] as const;

export const TIMELINES = [
    "ASAP (this month)",
    "30–60 days",
    "90 days",
    "Exploring",
] as const;

export const BUDGETS = [
    "<$500/mo",
    "$500–$1.5k/mo",
    "$1.5k–$3k/mo",
    "$3k+/mo",
] as const;

// ────────────────────────────────────────────────────────────────
// Interface
// ────────────────────────────────────────────────────────────────

export interface IAuditLead extends Document {
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    website?: string;
    platforms: typeof PLATFORMS[number][];
    avgPostsPerWeek?: string;
    hasCRM?: "yes" | "no" | "not_sure";
    tools?: string;
    goals: typeof GOALS[number][];
    timeline: typeof TIMELINES[number];
    budget?: typeof BUDGETS[number];
    notes?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    referrer?: string;
    honey?: string;
    privacyAccepted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// ────────────────────────────────────────────────────────────────
// Schema
// ────────────────────────────────────────────────────────────────

const AuditLeadSchema = new Schema<IAuditLead>(
    {
        // Step 1 — Contact
        fullName: { type: String, required: true, trim: true, minlength: 2 },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: {
            type: String,
            validate: {
                validator: function (v: string) {
                    return (
                        !v ||
                        /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(v)
                    );
                },
                message: "Use a valid US phone (optional)",
            },
        },
        company: { type: String, trim: true },
        website: {
            type: String,
            trim: true,
            validate: {
                validator: function (v: string) {
                    return !v || /^https?:\/\//i.test(v) || /\./.test(v);
                },
                message: "Add a valid URL (optional)",
            },
        },

        // Step 2 — Audit Basics
        platforms: {
            type: [String],
            enum: PLATFORMS,
            required: true,
        },
        avgPostsPerWeek: String,
        hasCRM: { type: String, enum: ["yes", "no", "not_sure"] },
        tools: String,

        // Step 3 — Priorities
        goals: { type: [String], enum: GOALS, required: true },
        timeline: { type: String, enum: TIMELINES, required: true },
        budget: { type: String, enum: BUDGETS },
        notes: String,

        // System Fields
        utm_source: String,
        utm_medium: String,
        utm_campaign: String,
        referrer: String,
        honey: String,
        privacyAccepted: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

// Prevent saving if honey is filled (bot detection)
AuditLeadSchema.pre("save", function (next) {
    if (this.honey) {
        const err = new Error("Bot detected");
        return next(err);
    }
    next();
});

export const AuditLead =
    models.AuditLead || model<IAuditLead>("AuditLead", AuditLeadSchema);
