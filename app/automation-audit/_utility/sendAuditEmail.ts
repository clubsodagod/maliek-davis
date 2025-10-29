/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Resend } from "resend";
import React from "react";
import { ResponseStatus } from "@/context/_library/classes-types-interaces";
import NewAutomationAuditEmail, { NewAutomationAuditEmailProps } from "@/app/emails/automation-audit/NewAuditRequest";

/**
 * Sends an internal notification when a new Automation Audit is submitted.
 * Provide one or more recipients in `to`.
 */
export async function sendNewAutomationAuditEmail(
    to: string | string[],
    props: NewAutomationAuditEmailProps,
    opts?: {
        cc?: string[];
        bcc?: string[];
        replyTo?: string | string[];
        from?: string; // override default from
        subject?: string; // override default subject
    }
): Promise<ResponseStatus> {
    // NOTE: Prefer a server-only key (RESEND_API_KEY). Using NEXT_PUBLIC_* here only to mirror your pattern.
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    try {
        const reactEmail = React.createElement(NewAutomationAuditEmail, props);

        const response = await resend.emails.send({
            from: opts?.from ?? "notifications@maliek-davis.com",
            to: Array.isArray(to) ? to : [to],
            cc: opts?.cc,
            bcc: opts?.bcc,
            replyTo: opts?.replyTo,
            subject:
                opts?.subject ??
                `New Automation Audit • ${props.fullName} • ${props.timeline}`,
            react: reactEmail as React.ReactElement,
        });

        if (response.error) {
            return {
                success: false,
                error: true,
                message: `Failed to send audit notification: ${response.error.message}`,
            };
        }

        return {
            success: true,
            error: false,
            message: "New automation audit notification sent.",
            data: response,
        };
    } catch (error: any) {
        console.error("[sendNewAutomationAuditEmail] error:", error);
        return {
            success: false,
            error: true,
            message: `Error sending audit notification: ${error?.message || String(error)}`,
        };
    }
}
