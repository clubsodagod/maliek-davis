/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ResponseStatus } from "@/context/_library/classes-types-interaces";
import connectToDB from "@/database/connect-to-db.database";
import { AuditLead } from "@/database/models/automation-audit";
import { ZodError, z } from "zod";
import {  type AuditLeadForm } from "../page"; // TYPE-ONLY import ✅ (no runtime)
import { sendNewAutomationAuditEmail } from "./sendAuditEmail";


const PLATFORMS = ["Instagram", "Facebook", "TikTok", "LinkedIn", "YouTube", "Email", "Website", "Other"] as const;
const GOALS = ["More inbound leads", "Consistent posting", "Faster follow-up", "Client onboarding automation", "Reporting/analytics", "Reduce manual work"] as const;
const TIMELINES = ["ASAP (this month)", "30–60 days", "90 days", "Exploring"] as const;
const BUDGETS = ["<$500/mo", "$500–$1.5k/mo", "$1.5k–$3k/mo", "$3k+/mo"] as const;


// Helpers
const nullableTrimmedString = z
    .string()
    .nullable()
    .transform((v) => (v ?? "").trim())
    .transform((v) => (v === "" ? null : v));

const nullableEnum = <T extends readonly [string, ...string[]]>(values: T) =>
    z.enum(values).nullable().transform((v) => (v ?? null));

// Phone regex
const PHONE_REGEX =
    /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;


const auditLeadSchema = z
    .object({
        // Step 1 — Contact
        fullName: z.string().min(2, "Please enter your name"),
        email: z.string().email("Add a valid email"),

        phone: z
            .string()
            .nullable()
            .transform((v) => (v ?? "").trim())
            .transform((v) => (v === "" ? null : v))
            .refine(
                (v) => v === null || PHONE_REGEX.test(v),
                { message: "Use a valid US phone (optional)" }
            ),

        company: nullableTrimmedString,
        website: nullableTrimmedString.refine(
            (v) => {
                if (v === null) return true;
                return /^https?:\/\//i.test(v) || /\./.test(v);
            },
            { message: "Add a valid URL (optional)" }
        ),

        // Step 2 — Audit Basics
        platforms: z.array(z.enum(PLATFORMS)).min(1, "Select at least 1 platform"),
        avgPostsPerWeek: nullableTrimmedString,
        hasCRM: z
            .enum(["yes", "no", "not_sure"])
            .nullable()
            .transform((v) => v ?? null),
        tools: nullableTrimmedString,

        // Step 3 — Priorities
        goals: z.array(z.enum(GOALS)).min(1, "Pick at least one priority"),
        timeline: z.enum(TIMELINES),

        budget: nullableEnum(BUDGETS),
        notes: nullableTrimmedString,

        // System fields
        utm_source: nullableTrimmedString,
        utm_medium: nullableTrimmedString,
        utm_campaign: nullableTrimmedString,
        referrer: nullableTrimmedString,
        honey: nullableTrimmedString,

        privacyAccepted: z
            .boolean()
            .refine((v) => v === true, "Please accept the privacy notice"),
    })
    .refine((d) => !d.honey, {
        message: "Bot detected",
        path: ["honey"],
    });

export async function submitAuditLead(form: AuditLeadForm): Promise<ResponseStatus> {
    try {
        await connectToDB();

        const newLead = new AuditLead({
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            company: form.company,
            website: form.website,
            platforms: form.platforms,
            avgPostsPerWeek: form.avgPostsPerWeek,
            hasCRM: form.hasCRM,
            tools: form.tools,
            goals: form.goals,
            timeline: form.timeline,
            budget: form.budget,
            notes: form.notes,
            utm_source: form.utm_source,
            utm_medium: form.utm_medium,
            utm_campaign: form.utm_campaign,
            referrer: form.referrer,
            privacyAccepted: form.privacyAccepted,
        });

        await newLead.save();
        
        await sendNewAutomationAuditEmail(
            ["self@maliek-davis.com"], // add teammates here
            {
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                company: form.company,
                website: form.website,
                platforms: form.platforms,
                avgPostsPerWeek: form.avgPostsPerWeek,
                hasCRM: form.hasCRM,
                tools: form.tools,
                goals: form.goals,
                timeline: form.timeline,
                budget: form.budget,
                notes: form.notes,
                utm_source: form.utm_source,
                utm_medium: form.utm_medium,
                utm_campaign: form.utm_campaign,
                referrer: form.referrer,
                submittedAt: new Date(),
            }
        );
        return {
            success: true,
            error: false,
            message: "Audit lead submitted successfully.",
            data: newLead._id.toString(),
        };
    } catch (err: any) {
        console.error("[submitAuditLead]", err);
        return {
            success: false,
            error: true,
            message: "Failed to submit audit lead. Please try again later.",
        };
    }
}
