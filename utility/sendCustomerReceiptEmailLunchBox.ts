/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Resend } from "resend";
import { ReactElement } from "react";
import CustomerReceiptEmail, { CustomerReceiptEmailProps } from "@/app/emails/the-lunch-box/checkout/CustomerReceiptEmail";

/**
 * Options to override defaults per send.
 */
type SendOpts = {
    to?: string | string[];       // Defaults to props.customerEmail
    cc?: string | string[];
    bcc?: string | string[];
    subject?: string;             // Defaults to "Your receipt"
    from?: string;                // Defaults to 'orders@your-domain.com'
    replyTo?: string | string[];  // Defaults to 'orders@your-domain.com'
};

/**
 * Sends a Customer Receipt email using Resend.
 * Expects you to have already built valid `CustomerReceiptEmailProps`
 * (e.g., from your successful Stripe session).
 *
 * ENV: NEXT_PUBLIC_RESEND_API_KEY (as you’re already using)
 */
export async function sendCustomerReceiptEmail(
    props: CustomerReceiptEmailProps,
    opts: SendOpts = {}
): Promise<{ id?: string; error?: string }> {
    const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY; // keeping your convention
    if (!apiKey) {
        return { error: "Missing Resend API key (NEXT_PUBLIC_RESEND_API_KEY)." };
    }

    const resend = new Resend(apiKey);

    const primaryTo = Array.isArray(opts.to)
        ? opts.to
        : opts.to
            ? [opts.to]
            : props.customerEmail
                ? [props.customerEmail]
                : [];

    if (primaryTo.length === 0) {
        return { error: "No recipient email found (props.customerEmail or opts.to required)." };
    }

    const from = opts.from ?? "orders@your-domain.com";
    const replyTo = opts.replyTo ?? "orders@your-domain.com";
    const subject =
        opts.subject ??
        `Your receipt from ${props.businessName ?? "Our Store"} — ${props.sessionId}`;

    try {
        const { data, error } = await resend.emails.send({
            from,
            to: primaryTo,
            ...(opts.cc ? { cc: opts.cc } : {}),
            ...(opts.bcc ? { bcc: opts.bcc } : {}),
            subject,
            cc: replyTo,
            react: CustomerReceiptEmail({...props}) as ReactElement,
        });

        if (error) return { error: error.message };
        return { id: data?.id };
    } catch (err: any) {
        return { error: err?.message || "Failed to send receipt email." };
    }
}
