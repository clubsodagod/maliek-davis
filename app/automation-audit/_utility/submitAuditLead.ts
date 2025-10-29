/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ResponseStatus } from "@/context/_library/classes-types-interaces";
import connectToDB from "@/database/connect-to-db.database";
import { AuditLead } from "@/database/models/automation-audit";
import { ZodError } from "zod";
import { auditLeadSchema, type AuditLeadForm } from "../page"; // TYPE-ONLY import ✅ (no runtime)
import { sendNewAutomationAuditEmail } from "./sendAuditEmail";

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
